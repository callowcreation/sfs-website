import { Component } from '@angular/core';
import { Database, DatabaseReference, getDatabase, objectVal, ref, set, update } from '@angular/fire/database';
import { FormGroup, FormControl } from '@angular/forms';
import { Settings } from 'src/app/interfaces/settings';
import { ConfigurationService, Tier } from 'src/app/services/configuration.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

    forms = {
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

        this.forms.appearance.setValue(configuration.appearance);
        this.forms.behaviour.setValue(configuration.behaviour);
        this.forms.bits.setValue(configuration.bits);

        objectVal<Settings>(this.doc).subscribe((value: any) => {
            this.configuration.update(value);
            this.forms.appearance.setValue(configuration.appearance);
            this.forms.behaviour.setValue(configuration.behaviour);
            this.forms.bits.setValue(configuration.bits);
        });
    }

    onSubmit(form: FormGroup) {
        this.configuration.update(form.value);
        update(this.doc, this.configuration.settings);
    }
}
