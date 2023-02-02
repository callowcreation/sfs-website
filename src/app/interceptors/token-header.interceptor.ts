import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '../services/storage.service';

@Injectable()
export class TokenHeaderInterceptor implements HttpInterceptor {

    constructor(private storage: StorageService) { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if (req.url.includes(environment.api)) {
            if (!this.storage.id_token) return next.handle(req);

            const clone = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.storage.id_token)
            });
            return next.handle(clone);
        }

        if (req.url.includes('https://api.twitch.tv/helix')) {
            if (!this.storage.auth) return next.handle(req);

            const clone = req.clone({
                headers: req.headers
                .set('Client-Id', environment.twitch.client_id)
                .set('Authorization', 'Bearer ' + this.storage.auth.access_token)
            });
            return next.handle(clone);
        }

        return next.handle(req);
    }
}
