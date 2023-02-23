import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class TwitchApiService {

    constructor(private http: HttpClient) { }

    users(values: string[]): Observable<User[]> {
        return this.http.get<User[]>(`${environment.twitch.urls.api}/users?${values.join('&')}`);
    }
}
