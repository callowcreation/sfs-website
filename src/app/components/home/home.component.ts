import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss', '../../../styles.scss']
})
export class HomeComponent {

    topic: string = "";

    constructor(storage: StorageService) {
        console.log({ '-a': storage.auth });
        console.log({ '-u': storage.user });
        console.log({ '-t': storage.id_token });
    }

    search(): void {

    }

}
