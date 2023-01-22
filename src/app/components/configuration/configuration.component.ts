import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, objectVal, ref } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
    settingsForm = new FormGroup({
        ['background-color']: new FormControl('#6441A5'),
        ['border-color']: new FormControl('#808080'),
        ['color']: new FormControl('#6441A5'),
        ['auto-shoutouts']: new FormControl(false),
        ['enable-bits']: new FormControl(true),
        ['bits-tier']: new FormControl('Tier 1'),
        ['pin-days']: new FormControl(3),
    });
    options = ['Tier 1', 'Tier 2', 'Tier 3'];

    constructor(auth: Auth, database: Database) {
        //const doc = ref(database, `${auth.currentUser?.uid}/posted_by`);
        //objectVal(doc).subscribe(value => console.log({ value }));
    }

    onSubmit() {
        // TODO: Use EventEmitter with form value
        console.warn(this.settingsForm.value);
    }
}
