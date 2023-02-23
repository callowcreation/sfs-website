import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-legacy',
  template: `
      <ng-content></ng-content>
      <div [ngStyle]="{'background-color': dataSource.legacy.value['background-color'], 'color': dataSource.legacy.value['color']}"
        style="margin: auto; height: 300px; width: 300px; margin-top: 20px; margin-bottom: 15px;">
        <header>
            <div class="container">
                <h2>Shoutouts for Streamers</h2>
            </div>
        </header>
        <ul class="items-list">
            <li *ngFor="let guest of dataSource.guests" class="ng-star-inserted">
                <div>
                    <div class="item" title="naivebot" [ngStyle]="{'border-color': dataSource.legacy.value['border-color']}">
                        <div class="item-image"><a target="_blank" href="https://www.twitch.tv/{{guest.streamer_id | twitch_user:'login'}}"><img
                                    src="{{guest.streamer_id | twitch_user:'profile_image_url'}}"></a>
                        </div>
                        <div class="item-info">
                            <div class="item-info-display_name">{{guest.streamer_id | twitch_user:'display_name'}}
                            </div>
                            <div class="item-info-description">{{guest.streamer_id | twitch_user:'description'}}</div>
                            <div class="item-info-posted_by ng-star-inserted"
                                [ngStyle]="{'background-color': dataSource.legacy.value['background-color'], 'border-color': dataSource.legacy.value['border-color']}">
                                {{guest.poster_id | twitch_user:'display_name'}}</div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
  `,
  styleUrls: ['./legacy.component.scss']
})
export class LegacyComponent {
    @Input() dataSource: any;
}
