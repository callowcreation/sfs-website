import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

interface Posted {
    login: string;
    display_name: string;
    timestamp: number;
}

interface Guest {
    login: string;
    id: string;
    display_name: string;
    profile_image_url: string;
    posted: Posted;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    pinned: string = 'streamer0';
    guests: Guest[] = [];
    selected: MatListOption[] = []

    form = new FormGroup({
        guests: new FormControl(),
    });

    canDelete: boolean = false;

    constructor(db: Database, private authentication: AuthenticationService, private storage: StorageService, private backend: BackendService, public dialog: MatDialog,) {
        objectVal<any>(ref(db, `${this.storage.user?.id}/shoutouts`)).subscribe((value: any) => {
            this.backend.get<any>(`/v3/api/dashboard/${storage.user?.id}`)
                .subscribe(({ guests }) => {
                    this.guests = guests;
                    this.guests.reverse();
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
                        this.guests = this.guests.filter(v => !this.selected.map(x => x.value).includes(v.login));
                        this.selected = [];
                    });
            }
        });
    }

    onChange(ev: MatSelectionListChange) {
        this.canDelete = ev.source.selectedOptions.selected.length > 0 ? true : false;
        this.selected = ev.source.selectedOptions.selected;
    }
}