import { Injectable } from '@angular/core';
import { AuthPayload } from '../interfaces/auth-payload';
import { User } from '../interfaces/user';

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
    
    static UpdateUser(user: User) {
        //console.log({ payload });
        localStorage.setItem('user', JSON.stringify(user));
    }

    static ProfileImage(): string | null {
        const value = localStorage.getItem('user');
        if (!value) return null;

        const user: User = JSON.parse(value) as User;

        return user.profile_image_url;
    }

    constructor() { }

}
