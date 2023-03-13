// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    version: '0.3.1',
    cycle: 'dev',
    api: 'http://127.0.0.1:5001/shoutoutsdev-38a1d/us-central1/app',
    useEmulators: true,
    firebase: {
        projectId: 'shoutoutsdev-38a1d',
        appId: '1:755014112663:web:457a853890bd93a56220d2',
        databaseURL: 'https://shoutoutsdev-38a1d.firebaseio.com',
        storageBucket: 'shoutoutsdev-38a1d.appspot.com',
        locationId: 'us-central',
        apiKey: 'AIzaSyCzNPQfEAGXvbPNxa0XVDG0jwJeQV7wUVE',
        authDomain: 'shoutoutsdev-38a1d.firebaseapp.com',
        messagingSenderId: '755014112663',
    },
    twitch: {
        client_id: 'l86frxm6zlfuj2sd7a8i7r751vuc7o',
        redirect_uri: 'http://localhost:4200',
        scopes: 'user:read:email',
        urls: {
            api: 'https://api.twitch.tv/helix',
            oauth: 'https://id.twitch.tv/oauth2',
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
