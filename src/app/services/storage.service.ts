import { Injectable } from '@angular/core';
import { AuthPayload } from '../interfaces/auth-payload';
import { TwitchUser } from '../interfaces/twitch-user';

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
    
    static UpdateUser(user: TwitchUser) {
        //console.log({ payload });
        localStorage.setItem('user', JSON.stringify(user));
    }

    get auth(): AuthPayload | null {
        const value = localStorage.getItem('auth');
        if (!value) return null;
        return JSON.parse(value) as AuthPayload;
    }

    get twitchUser(): TwitchUser | null {
        const value = localStorage.getItem('user');
        if (!value) return null;
        return JSON.parse(value) as TwitchUser;
    }

    constructor() { }

}
