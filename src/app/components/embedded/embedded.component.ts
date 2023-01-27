import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { Settings } from 'src/app/interfaces/settings';
import { User } from 'src/app/interfaces/user';
import { BackendService } from 'src/app/services/backend.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Keys, StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-embedded',
    templateUrl: './embedded.component.html',
    styleUrls: ['./embedded.component.scss']
})
export class EmbeddedComponent {

    ids: string[] = [];
    guests: User[] = [];
    display_name: string = this.storage.user?.display_name || '';
    profile_image_url: string = this.storage.user?.profile_image_url || '';
    description: string = this.storage.user?.description || '';

    settings: Settings;

    interval: any;

    constructor(private storage: StorageService, configuration: ConfigurationService, private backend: BackendService) {
        this.settings = this.storage.value<Settings>(Keys.SETTINGS) || configuration.defaultSettings;
        this.backend.get<any>('/v3/api/embedded').subscribe(({ featured, settings, guests }) => {
            console.log({ featured, settings, guests });
            this.guests = guests;
            this.settings = settings;
            this.display_name = featured.display_name;
            this.profile_image_url = featured.profile_image_url;
            this.description = featured.description;
        });
        this.interval = setInterval(async () => {
            this.backend.get<any>('/v3/api/embedded').subscribe(({ featured, settings, guests }) => {
                console.log({ featured, settings, guests });
                this.guests = guests;
                this.settings = settings;
                this.display_name = featured.display_name;
                this.profile_image_url = featured.profile_image_url;
                this.description = featured.description;
            });
        }, 1000 * 10);
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
