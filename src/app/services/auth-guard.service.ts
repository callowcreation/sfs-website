import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const value = localStorage.getItem('auth');
        if (!value) {
            this.router.navigateByUrl('/not-authorized');
            return false;
        }
        return true;
    }
}
