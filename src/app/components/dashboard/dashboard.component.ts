import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSelectionListChange } from '@angular/material/list';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
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
    guests: Guest[] = [
        { login: 'streamer1', profile_image_url: '', posted: { login: 'woLLac', timestamp: 1607583840213 } },
        { login: 'streamer2', profile_image_url: '', posted: { login: 'naivebot', timestamp: 1604538820851 } },
        { login: 'streamer3', profile_image_url: '', posted: { login: 'callowcreation', timestamp: 1590623631617 } },
        { login: 'streamer4', profile_image_url: '', posted: { login: 'sfs', timestamp: 1589578178831 } },
    ];

    form = new FormGroup({
        guests: new FormControl('', [Validators.required]),
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