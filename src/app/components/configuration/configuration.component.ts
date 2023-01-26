import { Component } from '@angular/core';
import { Database, DatabaseReference, getDatabase, objectVal, ref, set, update } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Settings } from 'src/app/interfaces/settings';
import { Keys, StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

    settingsForm = new FormGroup({
        'background-color': new FormControl('#6441A5'),
        'border-color': new FormControl('#808080'),
        'color': new FormControl('#6441A5'),
        'auto-shoutouts': new FormControl(false),
        'enable-bits': new FormControl(true),
        'bits-tier': new FormControl('Tier 1'),
        'pin-days': new FormControl(3)
    });
    options = ['Tier 1', 'Tier 2', 'Tier 3'];

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

    private get db(): Database {
        return getDatabase();
    }

    private get doc(): DatabaseReference {
        return ref(this.db, `${this.storage.user?.id}/settings`);
    }

    constructor(private storage: StorageService) {
        
        let settings: Settings = this.storage.value<Settings>(Keys.SETTINGS) || this.defaultSettings;
        this.settingsForm.setValue(settings);

        objectVal<Settings>(this.doc).subscribe((value: any) => {
            const vals: any[] = [];
            Object.keys(value).forEach((key: any) => {
                if (Object.keys(settings).includes(key)) {
                    vals[key] = value[key];
                }
            })
            settings = Object.assign(settings, vals);
            this.settingsForm.setValue(settings);
        });
    }

    onSubmit() {
        update(this.doc, this.settingsForm.value);
        this.storage.update('settings', this.settingsForm.value);
    }
}
