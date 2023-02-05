import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

enum Endpoints {
    USER = '/v3/api/user',
    COMMON = '/v3/api/common',
    PRODUCTS = '/v3/api/products',
    CONFIGURATION = '/v3/api/configuration',
    SHOUTOUTS = '/v3/api/shoutouts',
    DASHBOARD = '/v3/api/dashboard',
    EMBEDDED = '/v3/api/embedded',
}

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string, params: any = undefined): Observable<T> {
        return this.http.get<T>(`${environment.api}${endpoint}`, { params });
    }

    post<T>(endpoint: string, payload: any): Observable<T> {
        return this.http.post<T>(`${environment.api}${endpoint}`, payload);
    }

    delete<T>(endpoint: string, params: any = undefined): Observable<T> {
        return this.http.delete<T>(`${environment.api}${endpoint}`, { params });
    }

    createUser(user: any): Observable<string> {
        return this.post<string>(Endpoints.USER, user);
    }

    deleteUser(): Observable<void> {
        return this.delete<void>(Endpoints.USER);
    }
}
