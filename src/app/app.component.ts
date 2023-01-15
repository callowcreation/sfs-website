import { Component } from '@angular/core';
import { Database, objectVal, ref } from '@angular/fire/database';
import { Auth } from '@angular/fire/auth';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'sfs-website';

    loading: boolean = true;

    constructor(auth: Auth, database: Database) {

        const doc = ref(database, '75987197/posted_by');
        const v = objectVal(doc).subscribe(o => console.log({'----------------': o}));

        console.log({ val: v, auth });

    }

    ngOnInit() {

        //const listRef = this.db.list('75987197/posted_by');

        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }
}
