// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isContentLoading: false,
  // ReportPath: 'http://localhost:62692/TempImages/',
  BASE_API_URL: 'http://localhost:5205/api/',
  //BASE_API_URL: 'http://ecomapi.uccnoida.com/api/',
  // BASE_API_URL: 'http://wish.protatechindia.com/WishService3/api/',
  Domain: 'http://localhost:4200/',
  DocPath: 'P://',
  ReportPath: 'http://wish.protatechindia.com/WishService3/TempImages/',
  ImagePath:'http://localhost:5205/ProductImage'
  //ImagePath:'http://ecomapi.uccnoida.com/ProductImage'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
