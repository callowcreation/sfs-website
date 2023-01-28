import { Injectable } from '@angular/core';
import { calculateBackoffMillis } from '@firebase/util';
import { Settings } from '../interfaces/settings';
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

    get appearance() {
        return {
            'background-color': this.settings['background-color'],
            'border-color': this.settings['border-color'],
            'color': this.settings['color'],
        };
    }

    get behaviour() {
        return {
            'auto-shoutouts': this.settings['auto-shoutouts'],
            'badge-vip': this.settings['badge-vip'],
            'commands': this.settings['commands']
        };
    }

    get bits() {
        return {
            'enable-bits': this.settings['enable-bits'],
            'bits-tier': this.settings['bits-tier'],
            'pin-days': this.settings['pin-days'],
        };
    }

    constructor(private storage: StorageService) {
        this.settings = this.storage.value<Settings>(Keys.SETTINGS) || this.defaultSettings;
    }

    update(value: any): void {               
        const vals: any[] = [];
        Object.keys(value).forEach((key: any) => {
            if (Object.keys(this.settings).includes(key)) {
                vals[key] = value[key];
            }
        });
        this.settings = Object.assign(this.settings, vals);
        this.storage.update('settings', this.settings);
    }
    
    // update(key: Index, value: any): void {     
        
    //     this.settings[key].valueOf = value;

    //     const vals: any[] = [];
    //     Object.keys(value).forEach((key) => {
    //             if (Object.keys(this.settings).includes(key)) {
    //             vals[key] = value[key];
    //         }
    //     });
    //     this.settings = Object.assign(this.settings, vals);
    // }
}
