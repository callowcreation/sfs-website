import { Component } from '@angular/core';
import { Settings } from 'src/app/interfaces/settings';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Keys, StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-embedded',
  templateUrl: './embedded.component.html',
  styleUrls: ['./embedded.component.scss']
})
export class EmbeddedComponent {

    settings: Settings;

    constructor(private storage: StorageService, configuration: ConfigurationService) {
        this.settings = this.storage.value<Settings>(Keys.SETTINGS) || configuration.defaultSettings;
    }
}
