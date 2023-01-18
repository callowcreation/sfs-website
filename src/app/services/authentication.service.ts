import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthPayload } from '../interfaces/auth-payload';
import { StorageService } from './storage.service';

interface Header {
	headers: HttpHeaders;
}

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {

    }

    login(payload: AuthPayload | null) {
        if(payload != null) {        
            StorageService.UpdateAuth(payload);
            // TODO:
            // - get user info from twitch
            const httpOptions = {
                headers: new HttpHeaders({
                    'Client-Id': environment.twitch.client_id,
                    'Authorization': 'Bearer ' + payload.access_token
                })
            };
            this.http.get('https://api.twitch.tv/helix/users', httpOptions).subscribe(result => {
                console.log({result});
            });

            // - send token to firebase to create user from custom token
            //location.href = '/';
        }
        // else {} // redirect to failed
    }
}
