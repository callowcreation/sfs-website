import { Component } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { MenuName } from 'src/app/enums/menu-name';
import { StorageService } from 'src/app/services/storage.service';
export interface MetaData {
    menu: boolean;
    name: MenuName;
    icon: string | null;
}
export interface MenuRoute extends Route {
    data: MetaData
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    routes: Record<string, MenuRoute[]> = {};
    showMenu: boolean = false;
    showProfile = false;

    constructor(public router: Router) {

        for (let i = 0; i < router.config.length; i++) {
            const route = router.config[i] as MenuRoute;
            if(route.data.menu == false) continue;
            if(!this.routes[route.data.name]) this.routes[route.data.name] = [];
            this.routes[route.data.name].push(route);
        }
        this.showProfile = StorageService.HasAuth();
        console.log({routes: this.routes})
    }

    logout(): void {
        StorageService.RevokeAuth();
        location.href = '/';
    }
}
