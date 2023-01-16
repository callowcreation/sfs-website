import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthPayload } from '../interfaces/auth-payload';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor() { }    
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return !StorageService.HasAuth();
}
}
