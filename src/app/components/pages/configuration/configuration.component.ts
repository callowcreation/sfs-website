import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ViewChild } from '@angular/core';
import { Database, DatabaseReference, getDatabase, objectVal, ref, update } from '@angular/fire/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatRipple, RippleRef } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Settings } from 'src/app/interfaces/settings';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackendService } from 'src/app/services/backend.service';
import { ConfigurationService, Tier } from 'src/app/services/configuration.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
    @ViewChild(MatRipple) ripple: MatRipple | any;

    forms = {
        appearance: new FormGroup({
            'background-color': new FormControl(this.configuration.appearance['background-color']),
            'border-color': new FormControl(this.configuration.appearance['border-color']),
            'color': new FormControl(this.configuration.appearance['color']),
        }),
        behaviour: new FormGroup({
            'auto-shoutouts': new FormControl(this.configuration.behaviour['auto-shoutouts']),
            'badge-vip': new FormControl(this.configuration.behaviour['badge-vip']),
            'commands': new FormControl(this.configuration.behaviour['commands'])
        }),
        bits: new FormGroup({
            'enable-bits': new FormControl(this.configuration.bits['enable-bits']),
            'bits-tier': new FormControl(this.configuration.bits['bits-tier']),
            'pin-days': new FormControl(this.configuration.bits['pin-days']),
        })
    };

    commandControl: FormControl = new FormControl('', [Validators.pattern('[a-zA-Z0-9_-]{1,10}')]);

    options: Tier[] = ['Tier 1', 'Tier 2', 'Tier 3'];

    bits: any = {
        'move-up': 0,
        'pin-item': 0
    };

    products: any[] = [];

    commands: string[] = this.configuration.behaviour['commands'];

    guests: User[] = [];

    canDelete: boolean = false;

    private get db(): Database {
        return getDatabase();
    }

    private get doc(): DatabaseReference {
        return ref(this.db, `${this.storage.user?.id}/settings`);
    }

    get hasSpace(): boolean {
        return this.commandControl.value.includes(' ');
    }

    constructor(public dialog: MatDialog, private authentication: AuthenticationService, private storage: StorageService, private configuration: ConfigurationService, private backend: BackendService) {

        console.log({ configuration: this.configuration.behaviour })

        this.forms.appearance.setValue(configuration.appearance);
        this.forms.behaviour.setValue(configuration.behaviour);
        this.forms.bits.setValue(configuration.bits);

        objectVal<Settings>(ref(getDatabase(), `${this.storage.user?.id}/settings`)).subscribe((value: any) => {
            this.configuration.update(value);
            this.forms.appearance.setValue(configuration.appearance);
            this.forms.behaviour.setValue(configuration.behaviour);
            this.forms.bits.setValue(configuration.bits);
        });

        objectVal<any>(ref(getDatabase(), `${this.storage.user?.id}/shoutouts`)).subscribe((value: any) => {
            console.log({ value })
            this.backend.get<any>(`/v3/api/common/${this.storage.user?.id}`, {
                guests: true, // or object defining what parts of the [guests or any property, ie. features...] to return
            }).subscribe(({ guests }) => {
                console.log({ guests });
                this.guests = guests;
                this.guests.reverse();
            });
        });

        this.authentication.authenticte()
            .then(() => {
                this.backend.get<any>(`/v3/api/products`).subscribe(({ products }) => {
                    console.log({ products })
                    this.products = products;
                });
            })
            .catch(err => console.error(err));

        // user?.getIdToken().then(idToken => {
        //     this.storage.update(Keys.ID_TOKEN, idToken);
        // });
    }

    launchRipple() {
        const rippleRef: RippleRef = this.ripple.launch({
            persistent: false,
            centered: true,
            animation: { enterDuration: 1500, exitDuration: 1000 },
        });

        setTimeout(() => {
            rippleRef.fadeOut();
        }, 2500);
    }

    tierChange() {
        this.launchRipple();
        this.bitsTier();
    }

    bitsTier() {
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

    confirmRemove(command: string) {
        if (this.commands.indexOf(command, 0) === 0) return;
        const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { content: `Remove (${command}) command?` } });
        dialogRef.afterClosed().subscribe(result => {
            if (coerceBooleanProperty(result) === true) {
                this.removeCommand(command);
            }
        });
    }

    onChange(ev: MatSelectionListChange) {
        this.canDelete = ev.source.selectedOptions.selected.length > 0 ? true : false;
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

    removeCommand(command: string) {
        const startIndex = this.commands.indexOf(command, 0);
        if (!this.commands.includes(command)) return;
        if (startIndex === 0) return;
        this.commands.splice(startIndex, 1);
        this.forms.behaviour.patchValue({ commands: this.commands });
        this.onSubmit(this.forms.behaviour);
    }

    addCommand() {
        if (this.commandControl.value.trim() == '') return;
        if (this.commands.includes(this.commandControl.value)) return;
        this.commands.push(this.commandControl.value);
        this.forms.behaviour.patchValue({ commands: this.commands });
        this.commandControl.setValue('');
    }
}
