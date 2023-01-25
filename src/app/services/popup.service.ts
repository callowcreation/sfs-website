import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor() { }

    open(title: string, url: string, w: number = 500, h: number = 800) {
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
        return popupCenter(url, title, w, h);
    }
}
