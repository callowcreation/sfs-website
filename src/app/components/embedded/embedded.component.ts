import { Component, Input } from '@angular/core';
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
    featured: User = {};
    guests: User[] = [];

    settings: Settings;

    interval: any;

    @Input() isDarkMode: boolean = false;

    constructor(private storage: StorageService, configuration: ConfigurationService, private backend: BackendService) {
        this.settings = this.storage.value<Settings>(Keys.SETTINGS) || configuration.defaultSettings;
        this.backend.get<any>('/v3/api/embedded').subscribe(({ featured, settings, guests }) => {
            console.log({ featured, settings, guests });
            this.featured = featured;
            this.guests = guests;
            this.settings = settings;

        });
        this.interval = setInterval(async () => {
            this.backend.get<any>('/v3/api/embedded').subscribe(({ featured, settings, guests, retries }) => {
                console.log({ featured, settings, guests, retries });
                this.featured = featured;
                this.guests = guests;
                this.settings = settings;
            });
        }, 1000 * 10); // set to 45
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    visit(username: string | undefined) {
        if(!username) return;
        window.open(`https://www.twitch.tv/${username}`);
    }
}
