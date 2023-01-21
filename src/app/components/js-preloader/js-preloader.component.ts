import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-js-preloader',
  templateUrl: './js-preloader.component.html',
  styleUrls: ['./js-preloader.component.scss']
})
export class JsPreloaderComponent {  
    
    visible: Subject<boolean> = this.loaderService.visible;

    constructor(private loaderService: LoaderService) { }
}
