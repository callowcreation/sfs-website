import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { finalize, map, tap } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log(event.body);
                event = event.clone({ body: this.modifyBody(event.body) });
            }
            return event;
        }));
    }

    modifyBody(body: any): User {
        console.log({ body });
        const { id, login, email } = body.data[0];
        return { id, login, email };
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