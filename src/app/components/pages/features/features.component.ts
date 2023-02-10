import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
    
    panelOpenStates: boolean[] = [];
    isDarkMode: boolean = false;

    ngOnInit() {
        this.panelOpenStates = [false, false, false];
    }
}
