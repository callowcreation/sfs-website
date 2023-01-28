import { Component } from '@angular/core';
import { map } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    pinned: string = 'streamer0';
    guests: any[] = [
        { login: 'streamer1', posted: { login: 'woLLac', timestamp: 1607583840213 } },
        { login: 'streamer2', posted: { login: 'naivebot', timestamp: 1604538820851 } },
        { login: 'streamer3', posted: { login: 'callowcreation', timestamp: 1590623631617 } },
        { login: 'streamer4', posted: { login: 'sfs', timestamp: 1589578178831 } },
    ];

    constructor(private storage: StorageService, configuration: ConfigurationService, private backend: BackendService) {

        this.backend.get<any>(`/v3/api/dashboard/${storage.user?.id}`)
        .pipe(map(({guests}) => {

            return {guests};
        }))
        .subscribe(({ guests }) => {
            console.log({ guests });
            this.guests = guests;
        });
    }
}
