import { Component, Input } from '@angular/core';
import { Guest } from 'src/app/interfaces/guest';
import { Settings } from 'src/app/interfaces/settings';
import { BackendService } from 'src/app/services/backend.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Keys, StorageService } from 'src/app/services/storage.service';
import { TwitchUsersService } from 'src/app/services/twitch-users.service';


@Component({
    selector: 'app-embedded',
    templateUrl: './embedded.component.html',
    styleUrls: ['./embedded.component.scss']
})
export class EmbeddedComponent {

    ids: string[] = [];
    featured_id: string = '';
    guests: Guest[] = [];

    settings: Settings;

    interval: any;

    isDarkMode: boolean = false;

    constructor(private storage: StorageService, configuration: ConfigurationService, private backend: BackendService, private twitchUsers: TwitchUsersService) {
        this.settings = this.storage.value<Settings>(Keys.SETTINGS) || configuration.defaultSettings;

        this.backend.get<any>('/v3/api/embedded').subscribe(({ featured_id, settings, guests }) => {

            const params = [
                `id=${featured_id}`,
                guests.map((x: any) => {
                    return Object.values(x).map(v => `login=${v}`);
                }).flat()
            ].flat();

            twitchUsers.append(params)
                .then(() => {
                    this.featured_id = featured_id;
                    this.guests = guests;
                    this.settings = settings;

                })
        });
        this.interval = setInterval(async () => {
            this.backend.get<any>('/v3/api/embedded').subscribe(({ featured_id, settings, guests, retries }) => {
                const params = [
                    `id=${featured_id}`,
                    guests.map((x: any) => {
                        return Object.values(x).map(v => `login=${v}`);
                    }).flat()
                ].flat();

                twitchUsers.append(params)
                    .then(() => {
                        this.featured_id = featured_id;
                        this.guests = guests;
                        this.settings = settings;
                    })
            });
        }, 1000 * 10); // set to 45
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    visit(username: string | undefined) {
        if (!username) return;
        const user: any = this.twitchUsers.user(username);
        if(!user) return;
        window.open(`https://www.twitch.tv/${user.login}`);
    }
}
