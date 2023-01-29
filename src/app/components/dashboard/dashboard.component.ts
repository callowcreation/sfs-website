import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { StorageService } from 'src/app/services/storage.service';

interface Posted {
    login: string;
    timestamp: number;
}

interface Guest {
    login: string;
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

    form = new FormGroup({
        guests: new FormControl(),
    });
    
    canDelete: boolean = false;

    constructor(storage: StorageService, private backend: BackendService) {
        this.backend.get<any>(`/v3/api/dashboard/${storage.user?.id}`)
            .pipe(map(({ guests }) => {
                return {
                    guests: guests.map((x: any) => ({ login: x.login, profile_image_url: x.profile_image_url, posted: { login: x.posted.login, timestamp: x.posted.timestamp } }))
                };
            }))
            .subscribe(({ guests }) => {
                console.log({ guests });
                this.guests = guests;
                this.form.setValue({ guests });
            });
    }

    onSubmit() {
        console.log(this.form.value);
    }

    onChange(ev: MatSelectionListChange) {
        this.canDelete = ev.source.selectedOptions.selected.length > 0 ? true : false;
    }
}