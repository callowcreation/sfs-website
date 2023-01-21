import { Injectable } from '@angular/core';
import { AuthPayload } from '../interfaces/auth-payload';
import { User } from '../interfaces/user';

export type StorageKey = 'auth'| 'user' | 'id_token';
export enum Keys {
    AUTH = 'auth',
    USER = 'user',
    ID_TOKEN = 'id_token'
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    static HasAuth(): boolean {
        return !localStorage.getItem(Keys.ID_TOKEN) ? false : true;
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

    get id_token(): string | null {
        const value = localStorage.getItem(Keys.ID_TOKEN);
        if (!value) return null;
        return JSON.parse(value);
    }

    constructor() { }

    has(key: StorageKey): boolean {
        return localStorage.getItem(key) === null ? false : true;
    }

    update(key: StorageKey, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    
    clear() {
        Object.values(Keys).forEach(x => localStorage.removeItem(x));
    }
}
