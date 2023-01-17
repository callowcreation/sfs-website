import { Component } from '@angular/core';
import { AuthPayload } from 'src/app/interfaces/auth-payload';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private authService: AuthenticationService) {

    }
    login(): void {
        console.log('Send login to provider...');

        const client_id: string = environment.twitch.client_id;
        const redirect_uri: string = environment.twitch.redirect_uri;
        const scope: string[] = environment.twitch.scopes.split(' ');
        const state: string = window.crypto.randomUUID();
        console.log({ environment });
        const urlParams: string[] = [
            `client_id=${client_id}`,
            `redirect_uri=${encodeURIComponent(redirect_uri)}`,
            `response_type=code`,
            `scope=${encodeURIComponent(scope.join(' '))}`,
            `state=${state}`,
            `force_verify=true`
        ];

        const urlQuery: string = urlParams.join('&');

        const url: string = `https://id.twitch.tv/oauth2/authorize?${urlQuery}`;

        this.open(url).then(payload => {
            console.log({ payload: payload });
            if (payload && payload.access_token) {
                this.authService.login(payload.access_token);
                //StorageService.UpdateAuth(payload);
                //location.href = '/';
            }
        });
    }

    private async open(url: string): Promise<AuthPayload | null> {
        const popupCenter = (url: string, title: string, w: number, h: number) => {
            // Fixes dual-screen position                             Most browsers      Firefox
            const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
            const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

            const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            const systemZoom = 1;
            const left = (width - w) / 2 / systemZoom + dualScreenLeft
            const top = (height - h) / 2 / systemZoom + dualScreenTop
            const handle = window.open(url, title,
                `
              scrollbars=yes,
              width=${w / systemZoom}, 
              height=${h / systemZoom}, 
              top=${top}, 
              left=${left}
              `
            );

            if (!handle) {
                console.log(`The window wasn't allowed to open... This is likely caused by built-in popup blockers.`);
                return null;
            }

            handle.focus();
            return handle;
        }

        return new Promise((resolve, reject) => {
            const popup = popupCenter(url, 'Login with Twitch', 500, 800);
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

                            //console.log(payload);
                            //popup?.close();
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