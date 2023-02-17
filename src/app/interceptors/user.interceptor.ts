import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { User } from 'firebase/auth';
import { BackendService } from '../services/backend.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

    constructor(private backend: BackendService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<User>> {
        if(req.url.includes(environment.api)) return next.handle(req);

        return next.handle(req).pipe(map((event: HttpEvent<User>) => {
            if (event instanceof HttpResponse) {
                event = event.clone({ body: this.modifyBody(event.body) });
            }
            return event;
        }));
    }
    
    modifyBody(body: any): User | null {
        return body.data ? body.data[0] : body;
    }
}