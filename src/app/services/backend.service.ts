import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, signInWithCredential, getIdToken } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { StorageService } from './storage.service';

export enum Endpoints {
    USER = '/v3/api/user'
}

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    headers: HttpHeaders;

    constructor(private http: HttpClient, storage: StorageService) {
        this.headers = new HttpHeaders({
            'Authorization': 'Bearer ' + storage.id_token
        });
    }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${environment.api}${endpoint}`, { headers: this.headers });
    }

    post<T>(endpoint: string, payload: any): Observable<T> {
        return this.http.post<T>(`${environment.api}${endpoint}`, payload, { headers: this.headers });
    }
    
    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${environment.api}${endpoint}`, { headers: this.headers });
    }

    createUser(user: any): Observable<string> {
        return this.post<string>(Endpoints.USER, user);
    }

    deleteUser(id: string): Observable<void> {
        return this.delete<void>(`${Endpoints.USER}/${id}`);
    }
}
