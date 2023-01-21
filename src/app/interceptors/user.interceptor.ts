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

        console.log(req.url);
        if(req.url.includes(environment.api)) return next.handle(req);

        return next.handle(req).pipe(map((event: HttpEvent<User>) => {
            if (event instanceof HttpResponse) {
                event = event.clone({ body: this.modifyBody(event.body) });
            }
            return event;
        }));
    }
    
    modifyBody(body: any): User | null {
        //console.log({ body });
        return body.data ? body.data[0] : body;
        //throw new Error('Method not implemented.');
    }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //     const started = Date.now();
    //     let status: string;

    //     // extend server response observable with logging
    //     return next.handle(req).pipe(
    //         tap(
    //             // Succeeds when there is a response; ignore other events
    //             event => (status = event instanceof HttpResponse ? 'success' : 'fail'),
    //             // Operation failed; error is an HttpErrorResponse
    //             error => (status = 'failed')
    //         ),
    //         // Log when response observable either completes or errors
    //         finalize(() => {
    //             const elapsed = Date.now() - started;
    //             const url = req.urlWithParams.replace(new RegExp('^//|^.*?:(//)?', 'gi'), '');
    //             //this.log.add({ url, status, elapsed, fullUrl: req.urlWithParams });
    //             console.log({ url, status, elapsed, fullUrl: req.urlWithParams });
    //         })
    //     );
    // }
}