import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { TwitchApiService } from './twitch-api.service';

const CHUNK_SIZE: number = 100;

@Injectable({
    providedIn: 'root'
})
export class TwitchUsersService {

    private users: Record<string, User> = {};

    constructor(private twitchApi: TwitchApiService) { }

    private update(users: User[]) {
        for (let i = 0; i < users.length; i++) {
            const user: User = users[i];
            if(!this.users[user.id]) this.users[user.id] = user;
            if(!this.users[user.login]) this.users[user.login] = user;
        }
    }

    /**
     * @description Params login and id can be used in the same query
     * @param params 'login=username' or 'id=user-id'
     * Example: 'login=caLLowcreation' or 'id=75987197'
     */
    append(params: string[]) {
        return new Promise<void>(resolve => {
            const chunksAmount: number = Math.floor(params.length / CHUNK_SIZE);
            let chunksCounter: number = 0;
            for (let i = 0; i < params.length; i += CHUNK_SIZE) {
                const chunk: string[] = params.slice(i, i + CHUNK_SIZE);
                this.twitchApi.users(chunk)
                    .subscribe((users: User[]) => {
                        this.update(users);
                        if (++chunksCounter >= chunksAmount) resolve();
                    });
            }
        })
    }

    /**
     * 
     * @param value should be username (login) or user-id (id)
     * @returns Twitch user object
     */
    user(value: string): User {
        return this.users[value];
    }
}
