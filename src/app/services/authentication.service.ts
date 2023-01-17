import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private auth: Auth) {

    }

    login(token: string) {
        createUserWithEmailAndPassword(this.auth, 'callowcreation@gmail.com', token)
            .then(userCreds => {
                console.log({ userCreds });
            }).catch(e => {
                console.log({ e });
            });
        // signInWithCustomToken(this.auth, token).then(userCreds => {
        //     console.log({userCreds});
        // });
    }
}
