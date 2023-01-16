import { Injectable } from '@angular/core';
import { AuthPayload } from '../interfaces/auth-payload';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    static UpdateAuth(payload: AuthPayload) {
        //console.log({ payload });
        localStorage.setItem('auth', JSON.stringify(payload));
    }

    static HasAuth(): boolean {
        const value = localStorage.getItem('auth');
        if (!value) return false;

        const auth: AuthPayload = JSON.parse(value) as AuthPayload;

        //console.log({ value, auth });

        return true;
    }
    
    static RevokeAuth(): void {
        localStorage.removeItem('auth');
    }

    constructor() { }

}
