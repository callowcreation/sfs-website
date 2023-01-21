import { Auth, signInWithCustomToken, getIdToken } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Keys, StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private auth: Auth, private backend: BackendService, private storage: StorageService) {

    }

    authenticte() {
        const { user } = this.storage;
        if (!user) return;

        this.backend.createUser(user).subscribe(token => {
            signInWithCustomToken(this.auth, token)
                .then(async (credential: any) => {
                    console.log({credential})
                    const idToken = await getIdToken(credential.user);
                    this.storage.update(Keys.ID_TOKEN, idToken);
                    location.href = '/';
                })
        });
    }
}
