import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthPayload } from '../interfaces/auth-payload';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const value = localStorage.getItem('auth');
        if (!value) {
            window.location.href = "/login";
            return false;
        }
        return true;
    }
}
