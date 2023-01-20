import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthPayload } from '../interfaces/auth-payload';
import { TwitchUser } from '../interfaces/twitch-user';
import { StorageService } from './storage.service';

interface Header {
    headers: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient, private storageService: StorageService) {

    }

    login(twitchUser: TwitchUser | null) {
        const { auth } = this.storageService;
        if (!auth) return;

        // TODO:
        // - send token to firebase to create user from custom token
    }
}
