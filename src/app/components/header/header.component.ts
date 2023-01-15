import { Component } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    routes: Route[];
    showMenu: boolean = false;

    constructor(public router: Router) {
        this.routes = router.config.filter(x => {
            if(!x.data) return false;
            return x.data['menu'];
        });
    }
}
