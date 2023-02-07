import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    topic: string = "";

    constructor(storage: StorageService, public configuration: ConfigurationService) {
        console.log({ '-a': storage.auth });
        console.log({ '-u': storage.user });
        console.log({ '-t': storage.id_token });
    }
    
}
