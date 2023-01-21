import { Injectable } from '@angular/core';
import { AuthPayload } from '../interfaces/auth-payload';
import { User } from '../interfaces/user';

enum Keys {
    AUTH = 'auth',
    USER = 'user',
    TOKEN = 'token'
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    static HasAuth(): boolean {
        return !localStorage.getItem(Keys.TOKEN) ? false : true;
    }

    get auth(): AuthPayload | null {
        const value = localStorage.getItem(Keys.AUTH);
        if (!value) return null;
        return JSON.parse(value) as AuthPayload;
    }

    get user(): User | null {
        const value = localStorage.getItem(Keys.USER);
        if (!value) return null;
        return JSON.parse(value) as User;
    }

    get token(): string | null {
        const value = localStorage.getItem(Keys.TOKEN);
        if (!value) return null;
        return JSON.parse(value);
    }

    get hasAuth(): boolean {
        return localStorage.getItem(Keys.AUTH) === null ? false : true;
    }

    constructor() { }

    update(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    clear() {
        [Keys.AUTH, Keys.USER, Keys.TOKEN].forEach(x => localStorage.removeItem(x));
    }
}
