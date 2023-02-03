import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AuthPayload } from 'src/app/interfaces/auth-payload';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PopupService } from 'src/app/services/popup.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private http: HttpClient, private authentication: AuthenticationService, private storage: StorageService, private popup: PopupService) {

    }
    login(): void {

        const client_id: string = environment.twitch.client_id;
        const redirect_uri: string = environment.twitch.redirect_uri;
        const scope: string[] = environment.twitch.scopes.split(' ');
        const state: string = window.crypto.randomUUID();

        const urlParams: string[] = [
            `client_id=${client_id}`,
            `redirect_uri=${encodeURIComponent(redirect_uri)}`,
            `response_type=token`,
            `scope=${encodeURIComponent(scope.join(' '))}`,
            `state=${state}`,
            `force_verify=true`
        ];

        const urlQuery: string = urlParams.join('&');

        const url: string = `https://id.twitch.tv/oauth2/authorize?${urlQuery}`;


        this.open(url).then(payload => {
            //this.authService.login(payload)
            if (payload === null) return;

            this.storage.update('auth', payload);

            this.http.get<User>('https://api.twitch.tv/helix/users').pipe(map(x => {
                // console.log(x);
                return x;
            })).subscribe(result => {
                this.storage.update('user', result);
                this.authentication.authenticte()
                    .then(() => location.href = '/')
                    .catch(err => console.error(err))
            });
        });
    }

    private async open(url: string): Promise<AuthPayload | null> {
        return new Promise((resolve, reject) => {
            const popup = this.popup.open('Login with Twitch', url, 500, 800);
            const interval = setInterval(() => {
                try {
                    if (popup) {
                        if (popup.closed) {
                            clearInterval(interval);
                            resolve(null);
                            return;
                        }

                        if (popup.location && popup.location?.href) {
                            //console.log({...popup.location});

                            const payload: AuthPayload = popup.location.hash.substring(1)
                                .split("&")
                                .map(v => v.split("="))
                                .reduce((pre, [key, value]) => ({ ...pre, [key]: value }), {}) as AuthPayload;

                            //console.log(popup.location?.href);
                            popup?.close();
                            clearInterval(interval);
                            resolve(payload);
                        }
                    } else {
                        reject(null);
                    }
                } catch (e) {
                    /*--------------------------------------
                     DO NOT REJECT - this method checks for the process to be completed
                    --------------------------------------*/

                    //console.log(`***********************************************************************`, popup?.location?.href);

                    /*  error generated during dev on the hash property
        DOMException: Blocked a frame with origin "http://localhost:4200" from accessing a cross-origin frame.
        at http://localhost:4200/main.js:621:43
        at timer (http://localhost:4200/polyfills.js:9553:27)
        at _ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:7602:171)
        at http://localhost:4200/vendor.js:69966:49
        at AsyncStackTaggingZoneSpec.onInvokeTask (http://localhost:4200/vendor.js:69966:30)
        at _ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:7602:54)
        at Object.onInvokeTask (http://localhost:4200/vendor.js:70268:25)
        at _ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:7602:54)
        at Zone.runTask (http://localhost:4200/polyfills.js:7404:37)
        at invokeTask (http://localhost:4200/polyfills.js:7679:26)
                    */
                }
            }, 500);
        });

    }

}