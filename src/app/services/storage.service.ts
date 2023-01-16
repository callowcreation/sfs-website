import { Injectable } from '@angular/core';
import { AuthPayload } from '../interfaces/auth-payload';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    static HasAuth(): boolean {
        const value = localStorage.getItem('auth');
        if (!value) return false;

        const auth: AuthPayload = JSON.parse(value) as AuthPayload;

        console.log({ auth });

        return true;
    }
    
    static RevokeAuth(): void {
        localStorage.removeItem('auth');
    }
}
