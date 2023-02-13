import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appearance, Behaviour, Bits } from '../interfaces/configuration';
import { Settings } from '../interfaces/settings';
import { BackendService } from './backend.service';
import { Keys, StorageService } from './storage.service';

export type Tier = 'Tier 1' | 'Tier 2' | 'Tier 3';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    settings: Settings = this.defaultSettings;

    get defaultSettings(): Settings {
        return {
            'background-color': '#6441A5',
            'border-color': '#808080',
            'color': '#FFFFFF',
            'auto-shoutouts': false,
            'enable-bits': true,
            'bits-tier': 'Tier 1',
            'pin-days': 3,
            'badge-vip': true,
            'commands': ['so', 'shoutout'],
        };
    }

    get appearance(): Appearance {
        return {
            'background-color': this.notUndefined('background-color'),
            'border-color': this.notUndefined('border-color'),
            'color': this.notUndefined('color')
        };
    }

    get behaviour(): Behaviour {
        return {
            'auto-shoutouts': this.notUndefined('auto-shoutouts'),
            'badge-vip': this.notUndefined('badge-vip'),
            'commands': this.notUndefined('commands')
        };
    }

    get bits(): Bits {
        return {
            'enable-bits': this.notUndefined('enable-bits'),
            'bits-tier': this.notUndefined('bits-tier'),
            'pin-days': this.notUndefined('pin-days')
        };
    }

    get version(): string {
        return environment.version;
    }

    constructor(private storage: StorageService, private backend: BackendService) {
        this.settings = this.storage.value<Settings>(Keys.SETTINGS) || this.defaultSettings;
        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            settings: true,
        }).subscribe(({ settings }) => {
            // console.log({ settings });
            this.settings = settings;
        });
    }
    
    private notUndefined(key: string): any {
        return this.settings[key] || this.defaultSettings[key];
    }

    rndColor(): string {
        let found: boolean = false;
        let val = '';
        while (!found) {
            val = `${(Math.floor(Math.random() * 16777215).toString(16))}`;
            if (val.length !== 3 && val.length !== 6) continue;
            found = true;
            return `#${val}`;
        }
        return '#000';
    }

    update(value: any): void {
        Object.keys(value).forEach((key: string) => {
            if (Object.keys(this.settings).includes(key)) {
                this.settings[key] = value[key];
            }
        });
        this.storage.update('settings', this.settings);
    }
}
