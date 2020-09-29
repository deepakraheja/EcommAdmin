// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isContentLoading: false,
  

  /*********************Local Server************* */

  ImagePath: 'http://localhost:56283/ProductImage/',
  BASE_API_URL: 'http://localhost:56283/api/',
  APIURL: 'http://localhost:56283',
  Report_Path: 'http://localhost:56283/ReportGenerate/',

  //*********************Production Server************* */

  //BASE_API_URL: 'http://34.67.65.213/EcommApiV3/api/',
  //ImagePath: 'http://34.67.65.213/EcommApiV3/ProductImage/',
  //APIURL: 'http://34.67.65.213/EcommApiV3',
  //Report_Path: 'http://34.67.65.213/EcommApiV3/ReportGenerate/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
