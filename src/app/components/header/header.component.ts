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

    get profilePic(): string {
        return this.storageService.user?.profile_image_url || '';
    }

    constructor(public router: Router, private storageService: StorageService) {

        for (let i = 0; i < router.config.length; i++) {
            const route = router.config[i] as MenuRoute;
            if(route.data.menu == false) continue;
            if(!this.routes[route.data.name]) this.routes[route.data.name] = [];
            this.routes[route.data.name].push(route);
        }
        this.showProfile = this.storageService.hasAuth;
    }

    logout(): void {
        this.storageService.clear();
        location.href = '/';
    }
}
