import { Component } from '@angular/core';
import { Database, DatabaseReference, getDatabase, objectVal, ref, set, update } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Settings } from 'src/app/interfaces/settings';
import { ConfigurationService, Tier } from 'src/app/services/configuration.service';
import { Keys, StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

    form = {
        appearance: new FormGroup({
            'background-color': new FormControl(this.configuration.appearance['background-color']),
            'border-color': new FormControl(this.configuration.appearance['border-color']),
            'color': new FormControl(this.configuration.appearance['color']),
        }),
        behaviour: new FormGroup({
            'auto-shoutouts': new FormControl(this.configuration.behaviour['auto-shoutouts']),
            'badge-vip': new FormControl(this.configuration.behaviour['badge-vip']),
            'commands': new FormControl(this.configuration.behaviour['commands']),
        }),
        bits: new FormGroup({
            'enable-bits': new FormControl(this.configuration.bits['enable-bits']),
            'bits-tier': new FormControl(this.configuration.bits['bits-tier']),
            'pin-days': new FormControl(this.configuration.bits['pin-days']),
        }),
    };

    options: Tier[] = ['Tier 1', 'Tier 2', 'Tier 3'];
    commands: string[] = this.configuration.defaultSettings.commands;

    private get db(): Database {
        return getDatabase();
    }

    private get doc(): DatabaseReference {
        return ref(this.db, `${this.storage.user?.id}/settings`);
    }

    constructor(private storage: StorageService, private configuration: ConfigurationService) {

        console.log({ configuration: this.configuration.behaviour })

        this.form.appearance.setValue(configuration.appearance);
        this.form.behaviour.setValue(configuration.behaviour);
        this.form.bits.setValue(configuration.bits);

        objectVal<Settings>(this.doc).subscribe((value: any) => {
            this.configuration.update(value);
            this.form.appearance.setValue(configuration.appearance);
            this.form.behaviour.setValue(configuration.behaviour);
            this.form.bits.setValue(configuration.bits);
        });
    }

    onSubmit(form: FormGroup) {
        this.configuration.update(form.value);
        update(this.doc, this.configuration.settings);
    }
}
