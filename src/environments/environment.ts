// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'halo-60249',
    appId: '1:124850108802:web:93d3b9ce6a8e8e0692f79b',
    storageBucket: 'halo-60249.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBogLfVcHGpisc-2iDqHMFjvyr1MIhMigo',
    authDomain: 'halo-60249.firebaseapp.com',
    messagingSenderId: '124850108802',
  },
  authModule: {
    domain: 'dev-ufrbpiya3sx3an5i.us.auth0.com',
    clientId: 'xCwzgZSB0ZMGmEG0nfah9Aa2X4Y2wdBo',
    authorizationParams: {
      redirect_uri: 'http://localhost:4200'
    }
  },
  production: false
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
