import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss', '../../../styles.scss']
})
export class HomeComponent {

    topic: string = "";

    constructor(storageService: StorageService) {
        console.log({ '-a': storageService.auth });
        console.log({ '-u': storageService.user });
        console.log({ '-t': storageService.token });
    }

    search(): void {

    }

}
