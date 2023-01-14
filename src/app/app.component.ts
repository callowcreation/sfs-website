import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'sfs-website';

    loading: boolean = true;

    ngOnInit() {
        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
