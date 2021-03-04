// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isContentLoading: false,
  

  /*********************Local Server************* */

  // ImagePath: 'http://localhost:54444/ProductImage/',
  // BASE_API_URL: 'http://localhost:54444/api/',
  // APIURL: 'http://localhost:54444',
  // Report_Path: 'http://localhost:54444/ReportGenerate/',
  // UserDocumentPath: 'http://localhost:54444/UserDocument/',

  //*********************Production Server************* */

  BASE_API_URL: 'http://103.108.220.24/EcommApiV3/api/',
  ImagePath: 'http://103.108.220.24/EcommApiV3/ProductImage/',
  APIURL: 'http://103.108.220.24/EcommApiV3',
  Report_Path: 'http://103.108.220.24/EcommApiV3/ReportGenerate/',
  UserDocumentPath: 'http://103.108.220.24/EcommApiV3/UserDocument/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
