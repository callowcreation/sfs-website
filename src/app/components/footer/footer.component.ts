import { Component } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    constructor(public popup: PopupService) { }
}
