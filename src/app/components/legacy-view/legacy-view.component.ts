import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Appearance } from 'src/app/interfaces/configuration';
import { User } from 'src/app/interfaces/user';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Component({
    selector: 'app-legacy-view',
    templateUrl: './legacy-view.component.html',
    styleUrls: ['./legacy-view.component.scss']
})
export class LegacyViewComponent {

    guests: User[] = [

        {
            'id': '134571761',
            'login': 'karafruit',
            'display_name': 'karafruit',
            'type': '',
            'broadcaster_type': 'affiliate',
            'description': `I'm Kara (she/her), a trans gamer who streams occasionally and loves causing chaos.`,
            'profile_image_url': 'https://static-cdn.jtvnw.net/jtv_user_pictures/bf1e75cf-5cc1-407c-83b5-b2ffac46edf8-profile_image-300x300.png',
            'offline_image_url': '',
            'view_count': 8755,
            'posted_by': 'supertaliadx'
        },
        {
            'id': '78953016',
            'login': 'bisectedbrioche',
            'display_name': 'BisectedBrioche',
            'type': '',
            'broadcaster_type': 'affiliate',
            'description': 'Some bleach blonde Briton who has a strange obsession with bread, Metroid and her favourite flavour/brand of bubblegum.',
            'profile_image_url': 'https://static-cdn.jtvnw.net/jtv_user_pictures/7cf1e523-2a65-4ef7-9ca0-e0d616423afc-profile_image-300x300.png',
            'offline_image_url': 'https://static-cdn.jtvnw.net/jtv_user_pictures/aa986987-e7dd-45a0-91df-7834a5de18f3-channel_offline_image-1920x1080.png',
            'view_count': 6574,
            'posted_by': 'supertaliadx'
        },
        {
            'id': '21006618',
            'login': 'ikifoo',
            'display_name': 'IkiFoo',
            'type': '',
            'broadcaster_type': 'affiliate',
            'description': 'Glaswegian gamer named Gordon. (he/him) Usually found in the realms of retro. (MS-DOS, Windows 98, PlayStation 1, etc) Fuelled by caffeine, cats and cuddles.',
            'profile_image_url': 'https://static-cdn.jtvnw.net/jtv_user_pictures/ikifoo-profile_image-3f3dea8d8c0d6573-300x300.png',
            'offline_image_url': 'https://static-cdn.jtvnw.net/jtv_user_pictures/c584af32-a853-4a00-9dcb-9183f3d09e95-channel_offline_image-1920x1080.png',
            'view_count': 1975,
            'posted_by': 'defenderofthebean'
        },
        {
            'id': '80151097',
            'login': 'thewanderer1990',
            'display_name': 'TheWanderer1990',
            'type': '',
            'broadcaster_type': 'affiliate',
            'description': 'Forever an elusive mystery with undetermined origins tracing back to somewhere in Sydney Australia...',
            'profile_image_url': 'https://static-cdn.jtvnw.net/jtv_user_pictures/8df38af9-6d06-44d1-a786-822b0fc390b8-profile_image-300x300.png',
            'offline_image_url': 'https://static-cdn.jtvnw.net/jtv_user_pictures/thewanderer1990-channel_offline_image-e57d719d0a0c4779-1920x1080.jpeg',
            'view_count': 3452,
            'posted_by': 'supertaliadx'
        }

    ];

    private appearance: Appearance = {
        'background-color': '#CFCFCF',
        'border-color': '#00FF00',
        'color': '#000000'
    };

    forms = {
        appearance: new FormGroup({
            'background-color': new FormControl(this.appearance['background-color']),
            'border-color': new FormControl(this.appearance['border-color']),
            'color': new FormControl(this.appearance['color']),
        })
    };

    private get rndColor(): string {
        return `#${(Math.floor(Math.random() * 16777215).toString(16))}`;
    }

    constructor() {

    }

    reset() {
        this.forms.appearance.patchValue(this.appearance);
    }

    randomize() {
        this.forms.appearance.patchValue({
            'background-color': this.rndColor,
            'border-color': this.rndColor,
            'color': this.rndColor
        });
    }
}
