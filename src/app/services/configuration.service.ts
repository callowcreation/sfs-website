import { Injectable } from '@angular/core';
import { Settings } from '../interfaces/settings';

@Injectable({
    providedIn: 'root'
})
export class ConfigurationService {

    get defaultSettings(): Settings {
        return {
            'background-color': '#6441A5',
            'border-color': '#808080',
            'color': '#FFFFFF',
            'auto-shoutouts': false,
            'enable-bits': true,
            'bits-tier': 'Tier 1',
            'pin-days': 3
        };
    }
    
    constructor() { }
}
