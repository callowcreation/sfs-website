import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService {

    constructor(public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        const value = !StorageService.HasAuth();
        if(!value) {
            this.router.navigateByUrl('/');
            return false;
        }

        return true;
    }
}
