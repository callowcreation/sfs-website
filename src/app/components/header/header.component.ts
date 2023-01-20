import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuRoute } from 'src/app/interfaces/menu-route';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    routes: Record<string, MenuRoute[]> = {};
    showMenu: boolean = false;
    showProfile = false;

    get profilePic(): string | null {
        return StorageService.ProfileImage();
    }

    constructor(public router: Router) {

        for (let i = 0; i < router.config.length; i++) {
            const route = router.config[i] as MenuRoute;
            if(route.data.menu == false) continue;
            if(!this.routes[route.data.name]) this.routes[route.data.name] = [];
            this.routes[route.data.name].push(route);
        }
        this.showProfile = StorageService.HasAuth();

        console.log({environment, routes: this.routes});
    }

    logout(): void {
        StorageService.RevokeAuth();
        location.href = '/';
    }
}
