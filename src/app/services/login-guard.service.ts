import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthPayload } from '../interfaces/auth-payload';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor() { }    
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!localStorage.getItem('auth')) return true;
    return false;
}
}
