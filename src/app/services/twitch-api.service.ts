import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class TwitchApiService {

    constructor(private http: HttpClient, private authentication: AuthenticationService, private storage: StorageService) { }

    usersById(ids: string[]) {
        return this.http.get<User[]>(`${environment.twitch.urls.api}/users?${ids.map(x => `id=${x}`).join('&')}`);
    }

    users(values: string[]) {
        return this.http.get<User[]>(`${environment.twitch.urls.api}/users?${values.join('&')}`);
    }
}
