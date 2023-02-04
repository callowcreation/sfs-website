import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';

interface Posted {
    login: string;
    timestamp: number;
}

interface Guest {
    login: string;
    id: string;
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

    constructor(private authentication: AuthenticationService, storage: StorageService, private backend: BackendService) {
        this.backend.get<any>(`/v3/api/dashboard/${storage.user?.id}`)
            .pipe(map(({ guests }) => {
                return {
                    guests: guests.map((x: any) => ({ login: x.login, id: x.id, profile_image_url: x.profile_image_url, posted: { login: x.posted.login, timestamp: x.posted.timestamp } }))
                };
            }))
            .subscribe(({ guests }) => {
                console.log({ guests });
                this.guests = guests;
                this.form.setValue({ guests });
            });

        this.authentication.authenticte()
            .then(() => {
                console.log('Authenticte')
            })
            .catch(err => console.error(err));
    }

    onSubmit() {
        console.log(this.form.value);
        console.log({ selected: this.selected });
        this.backend.delete<any>('/v3/api/75987197/shoutouts', this.selected.map(x => x.value))
            .subscribe(resource => {
                console.log({ resource })
                this.guests = this.guests.filter(x => !Object.values(resource.query).includes(x.login))
            });
    }

    onChange(ev: MatSelectionListChange) {
        this.canDelete = ev.source.selectedOptions.selected.length > 0 ? true : false;
        this.selected = ev.source.selectedOptions.selected;
    }
}