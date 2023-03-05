import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { map } from 'rxjs';
import { Guest } from 'src/app/interfaces/guest';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';
import { TwitchUsersService } from 'src/app/services/twitch-users.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

interface GuestPinned extends Guest {
    is_pin: boolean;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    guests: GuestPinned[] = [];
    selected: MatListOption[] = []

    form = new FormGroup({
        guests: new FormControl(),
    });

    canDelete: boolean = false;

    constructor(db: Database, private authentication: AuthenticationService, private storage: StorageService, private backend: BackendService, public dialog: MatDialog, private twitchUsers: TwitchUsersService) {
        objectVal<any>(ref(db, `${this.storage.user?.id}/shoutouts`)).subscribe((value: any) => {
            console.log({ value })
        });
        this.backend.get<any>(`/v3/api/dashboard/${storage.user?.id}`)
            .subscribe(({ guests, pinned }) => {
                console.log({ guests, pinned })

                if (pinned) {
                    guests = guests.filter((x: GuestPinned) => x.streamer_id != pinned.streamer_id);
                    pinned.is_pin = true;
                    guests.push(pinned);
                }

                const guestParams = (pre: 'id' | 'login', { streamer_id, poster_id }: { streamer_id: string, poster_id: string }): string[] => {
                    return [`${pre}=${streamer_id}`, `${pre}=${poster_id}`];
                };

                const paramsLegacy = (guest: any): string[] => {
                    return guest.legacy === true ? guestParams('login', guest) : guestParams('id', guest);
                };
                const flat = guests.map(paramsLegacy).flat();
                console.log({ flat })
                twitchUsers.append(flat)
                    .then(() => {
                        this.guests = this.removeDuplicates(guests);
                        this.form.setValue({ guests });
                    });

            });
        this.authentication.authenticte()
            .then()
            .catch(err => console.error(err));
    }

    onSubmit() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { content: `Remove (${this.selected.length}) selected shoutout(s)?` } });
        dialogRef.afterClosed().subscribe(result => {
            if (coerceBooleanProperty(result) === true) {
                this.canDelete = false;
                this.backend.delete<any>('/v3/api/shoutouts', this.selected.map(x => x.value))
                    .subscribe(() => {
                        this.guests = this.guests.filter(v => !this.selected.map(x => x.value).includes(v.streamer_id));
                        this.selected = [];
                    });
            }
        });
    }

    onChange(ev: MatSelectionListChange) {
        this.canDelete = ev.source.selectedOptions.selected.length > 0 ? true : false;
        this.selected = ev.source.selectedOptions.selected;
    }

    removeDuplicates(arr: any[]) {
        return arr.filter((value: Guest, index, self) =>
            index === self.findIndex((t: Guest) => {
                const u1 = this.twitchUsers.user(t.streamer_id);
                const u2 = this.twitchUsers.user(value.streamer_id);
                return (
                    u1.id === u2.id
                )
            })
        );
    }
}
