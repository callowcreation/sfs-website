import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database, objectVal, ref } from '@angular/fire/database';
import { map } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {

    constructor(auth: Auth, database: Database) {

        const doc = ref(database, '75987197/posted_by');
        objectVal(doc).subscribe(value => console.log({ value }));
    }

    ngOnInit() {

        //const listRef = this.db.list('75987197/posted_by');

        // setTimeout(() => {
        //     this.loading = false;
        // }, 1000);
    }

    /*backgroundColor: string;
    color: string;
    borderColor: string;

    autoShoutouts: boolean;

    enableBits: boolean;
    bitsTier: string;
    pinDays: number;

    isConfig: boolean;

    changeEvent = new EventEmitter<any>();

    moveUpBitsAmount = 0;
    pinToTopBitsAmount = 0;

    public options: string[] = bitsTierOptions.map(x => x.name);

    constructor(private twitchLibService: TwitchLibService) {
        const { broadcast$ } = twitchLibService;

        this.setBitsAmounts();

        broadcast$.subscribe(obj => {
            //console.log({ broadcastBaseSettingsComponent: obj.settingsResponse.settings['bits-tier'] });
            this.setBitsAmounts();
        });
    }

    settingChange(key: string, value: string | boolean | number): void {
        this.changeEvent.emit({ settings: { [`${key}`]: value } });
    }

    setBitsAmounts(): void {

        const { bits } = this.twitchLibService;

        bits.getProducts().then(products => {
            //console.log({ bitsBaseSettingsComponent: products, bitsTier: this.bitsTier });

            //const sku = products.find(x => x.sku === skuName);

            const moveUpAmount: any[] = [];
            const pinToTopAmount: any[] = [];

            moveUpAmount['Tier 1'] = products.find(x => x.sku === 'move-up-t1').cost.amount;
            moveUpAmount['Tier 2'] = products.find(x => x.sku === 'move-up-t2').cost.amount;
            moveUpAmount['Tier 3'] = products.find(x => x.sku === 'move-up-t3').cost.amount;

            pinToTopAmount['Tier 1'] = products.find(x => x.sku === 'pin-item-t1').cost.amount;
            pinToTopAmount['Tier 2'] = products.find(x => x.sku === 'pin-item-t2').cost.amount;
            pinToTopAmount['Tier 3'] = products.find(x => x.sku === 'pin-item-t3').cost.amount;

            this.moveUpBitsAmount = moveUpAmount[this.bitsTier];
            this.pinToTopBitsAmount = pinToTopAmount[this.bitsTier];
        });
    }*/

    getDefaultSettings() {
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
}
