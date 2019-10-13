// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {     //TODO: Set the values from firebase console
    apiKey: "<API Key>",
    authDomain: "<Auth Domain>",
    databaseURL: "<Database URL>",
    projectId: "<Project ID>",
    storageBucket: "<Storage Bucket>",
    messagingSenderId: "<Messaging Sender ID>",
    appId: "<App ID>"
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
