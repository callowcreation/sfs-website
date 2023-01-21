import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

    visible = new Subject<boolean>();

    constructor() { }

    show() {
        this.visible.next(true);
    }

    hide() {
        this.visible.next(false);
    }
}
