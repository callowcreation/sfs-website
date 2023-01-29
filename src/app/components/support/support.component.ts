import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {

    panels = [
        {
            title: 'Usage',
            summary: 'How do I use the extension?',
            description: `Use the shoutout command. !so twitch_name`,
            state: false
        }
    ];

    constructor(public configuration: ConfigurationService) {
        
    }

    ngOnInit() {
        
    }
}
