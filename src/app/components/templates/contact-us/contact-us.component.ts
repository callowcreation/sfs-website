import { Component } from '@angular/core';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-contact-us',
  template: `
      <h1>Contact Us</h1>
    <p><ng-content></ng-content> </p>
    <ul>
        <li><a href="#" target="_blank" (click)="popup.contactUs()">Fill Form</a></li>
        <li>Email To: shoutoutsforstreamers@gmail.com</li>
    </ul>
  `,
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
    constructor(public popup: PopupService) {
        
    }
}
