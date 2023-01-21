import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, signInWithCredential } from '@angular/fire/auth';
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

    constructor(private http: HttpClient, private storageService: StorageService) {

    }

    authenticte() {
        const { auth, user } = this.storageService;
        if(!auth || !user) return;
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Client-Id': environment.twitch.client_id,
                'Authorization': 'Bearer ' + auth.access_token
            })
        };
        this.http.post<string>(`${environment.api}/v3/api/user`, user, httpOptions).pipe(map(token => {
            this.storageService.update('token', token);
            return token;
        })).subscribe(result => {
            console.log({ result });
            //location.href = '/';
        });
    }
}
