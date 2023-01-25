import { Component } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

    constructor(private popup: PopupService) { }

    contactUs() {
        const url: string = 'https://docs.google.com/forms/d/e/1FAIpQLSct_hFYQI-57ypNSW3hWZXKbb_3_U5D4ULQzm462Extz3WyHQ/viewform?usp=sharing';
        if(this.popup.open('Contact Us', url, 500, 800) === null) {
            window.open(url);
        }
    }
}
