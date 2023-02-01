import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MenuRoute } from 'src/app/interfaces/menu-route';
import { StorageService, Keys } from 'src/app/services/storage.service';

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
        return this.storage.user?.profile_image_url || '';
    }

    get display_name(): string {
        return this.storage.user?.display_name || 'Welcome to Terra';
    }

    constructor(public router: Router, private storage: StorageService, private auth: Auth) {

        for (let i = 0; i < router.config.length; i++) {
            const route = router.config[i] as MenuRoute;
            if (route.data.menu == false) continue;
            if (!this.routes[route.data.name]) this.routes[route.data.name] = [];
            this.routes[route.data.name].push(route);
        }
        this.showProfile = this.storage.has(Keys.AUTH);
    }

    logout(): void {
        this.storage.clear();
        signOut(this.auth).then(() => {
            location.href = '/';
        });
    }
}
