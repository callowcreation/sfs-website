import { Component } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.scss']
})
export class InstallComponent {

    constructor(public configuration: ConfigurationService) { }

    viewOnTwitch() {
        window.open(`https://dashboard.twitch.tv/extensions/0ghp1wfzi7hdp144bpwagh9q86xjkg-${this.configuration.version}`);
    }

}
