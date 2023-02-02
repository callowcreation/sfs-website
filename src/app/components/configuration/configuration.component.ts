import { Component } from '@angular/core';
import { Database, DatabaseReference, getDatabase, objectVal, ref, set, update } from '@angular/fire/database';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs';
import { Settings } from 'src/app/interfaces/settings';
import { User } from 'src/app/interfaces/user';
import { BackendService } from 'src/app/services/backend.service';
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
    bits: any = {
        'move-up': 50,
        'pin-item': 100
    };
    products: any[] = [];

    commands: string[] = this.configuration.defaultSettings.commands;

    guests: User[] = [];

    private get db(): Database {
        return getDatabase();
    }

    private get doc(): DatabaseReference {
        return ref(this.db, `${this.storage.user?.id}/settings`);
    }

    constructor(private storage: StorageService, private configuration: ConfigurationService, private backend: BackendService) {

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

        this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
            guests: true, // or object defining what parts of the [guests or any property, ie. features...] to return
        }).subscribe(({ guests }) => {
            console.log({ guests });
            this.guests = guests;
        });

        this.backend.get<any>(`/v3/api/products`).subscribe(({ products }) => {
            console.log({ products })
            this.products = products;
        });
    }

    tierChange() {
        switch (this.forms.bits.value['bits-tier']) {
            case 'Tier 1': {
                this.bits = {
                    'move-up': this.products.find(x => x.sku === 'move-up-t1').cost.amount,
                    'pin-item': this.products.find(x => x.sku === 'pin-item-t1').cost.amount
                };
            } break;
            case 'Tier 2': {
                this.bits = {
                    'move-up': this.products.find(x => x.sku === 'move-up-t2').cost.amount,
                    'pin-item': this.products.find(x => x.sku === 'pin-item-t2').cost.amount
                };
            } break;
            case 'Tier 3': {
                this.bits = {
                    'move-up': this.products.find(x => x.sku === 'move-up-t3').cost.amount,
                    'pin-item': this.products.find(x => x.sku === 'pin-item-t3').cost.amount
                };
            } break;
            default:
                break;
        }
    }

    onSubmit(form: FormGroup) {
        this.configuration.update(form.value);
        update(this.doc, this.configuration.settings);
    }

    reset() {
        this.forms.appearance.patchValue(this.configuration.appearance);
    }

    randomize() {
        this.forms.appearance.patchValue({
            'background-color': this.configuration.rndColor(),
            'border-color': this.configuration.rndColor(),
            'color': this.configuration.rndColor()
        });
    }
}
