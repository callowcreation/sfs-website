import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthPayload } from '../interfaces/auth-payload';
import { User } from '../interfaces/user';
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
        if (payload != null) {
            StorageService.UpdateAuth(payload);
            const httpOptions = {
                headers: new HttpHeaders({
                    'Client-Id': environment.twitch.client_id,
                    'Authorization': 'Bearer ' + payload.access_token
                })
            };
            this.http.get('https://api.twitch.tv/helix/users', httpOptions).pipe(map(x => {
                console.log(x);
                return x;
            })).subscribe(result => {
                console.log({ ...result });
                StorageService.UpdateUser(result as User);
                // TODO:
                // - send token to firebase to create user from custom token
            });
        }
        // else {} // redirect to failed
    }
}
