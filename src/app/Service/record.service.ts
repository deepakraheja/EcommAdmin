import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Record/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }
  // SearchEmp(_applicantObj: any): Observable<any> {
  //   this._methodName = "SearchEmp/";
  //   this._param = _applicantObj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  GetWorkGroupByBranchId(_obj: any): Observable<any> {
    this._methodName = "GetWorkGroupByBranchId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  // GetEmpStatus(_obj: any): Observable<any> {
  //   this._methodName = "GetEmpStatus/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  // GetWrkgrpStatus(_obj: any): Observable<any> {
  //   this._methodName = "GetWrkgrpStatus/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  // GetMaritalStatus(_obj: any): Observable<any> {
  //   this._methodName = "GetMaritalStatus/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  // GetGenderTypes(_obj: any): Observable<any> {
  //   this._methodName = "GetGenderTypes/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  // GetLookupEmployeeTypes(_obj: any): Observable<any> {
  //   this._methodName = "GetLookupEmployeeTypes/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  // // GetUsersByUserType(_obj: any): Observable<any> {
  // //   this._methodName = "GetUsersByUserType/";
  // //   this._param = _obj;
  // //   return this._http.post<any>(
  // //     this._url + this._methodName, this._param
  // //   );
  // // }
  // GetJobTitleByJobTitleID(_obj: any): Observable<any> {
  //   this._methodName = "GetJobTitleByJobTitleID/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  GetEmployeeManager(_obj: any): Observable<any> {
    this._methodName = "GetEmployeeManager/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  // SaveEmployee(_obj: any): Observable<any> {
  //   this._methodName = "SaveEmployee/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  // GetEmployeeById(_obj: any): Observable<any> {
  //   this._methodName = "GetEmployeeById/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
  // GetBranchByEmpId(_obj: any): Observable<any> {
  //   this._methodName = "GetBranchByEmpId/";
  //   this._param = _obj;
  //   return this._http.post<any>(
  //     this._url + this._methodName, this._param
  //   );
  // }
//   GetLicenseBranchByBranchId(_obj: any): Observable<any> {
//     this._methodName = "GetLicenseBranchByBranchId/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetLicenseStatusById(_obj: any): Observable<any> {
//     this._methodName = "GetLicenseStatusById/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   SaveLicense(_obj: any): Observable<any> {
//     this._methodName = "SaveEmpLicense/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetEmployeeLicensingById(_obj: any): Observable<any> {
//     this._methodName = "GetEmployeeLicensingById/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   DelEmployeeLicensingById(_obj: any): Observable<any> {
//     this._methodName = "DelEmployeeLicensingById/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   //EmployeeJobTrainingID
 
//   //JobTraining
//   GetJobTrainingClass(): Observable<any> {
//     this._methodName = "GetJobTrainingClass/";
//     this._param = {};
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetEmployeeJobTrainingByEmpId(_obj: any): Observable<any> {
//     this._methodName = "GetEmployeeJobTrainingByEmpId/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetJobTrainingByBridCId(_obj: any): Observable<any> {
//     this._methodName = "GetJobTrainingByBridCId/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetEmployeeJobTrainingId(_obj: any): Observable<any> {
//     this._methodName = "GetEmployeeJobTrainingById/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
  
//   JobTrainigSaved(_obj: any): Observable<any> {
//     this._methodName = "JobTrainigSaved/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   DelEmployeeJobTraining(_obj: any): Observable<any> {
//     this._methodName = "DelEmployeeJobTraining/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
  
// //End
// // Start DisciplinaryAction  
// GetLookupDisciplinaryActionType(_obj: any): Observable<any> {
//     this._methodName = "GetLookupDisciplinaryActionType/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//  GetActionVoilationType(_obj: any): Observable<any> {
//     this._methodName = "GetActionVoilationType/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   SaveDisciplinaryAction(_obj: any): Observable<any> {
//     this._methodName = "SaveDisciplinaryAction/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetDisciplinaryAction(_obj: any): Observable<any> {
//     this._methodName = "GetDisciplinaryAction/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetEmpSchedule(_obj: any): Observable<any> {
//     this._methodName = "GetEmpSchedule/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }  
//   //end DisciplinaryAction
//   //Start Employee Notes
//   GetCompanyNotesById(_obj: any): Observable<any> {
//     this._methodName = "GetCompanyNotesById/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetEmployeeNotes(_obj: any): Observable<any> {
//     this._methodName = "GetEmployeeNotes/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetNoShowNotesJobByEmpId(_obj: any): Observable<any> {
//     this._methodName = "GetNoShowNotesJobByEmpId/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
//   GetEmployeeNotesByEmpId(_obj: any): Observable<any> {
//     this._methodName = "GetEmployeeNotesByEmpId/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }  
//   SaveEmployeeNotes(_obj: any): Observable<any> {
//     this._methodName = "SaveEmployeeNotes/";
//     this._param = _obj;
//     return this._http.post<any>(
//       this._url + this._methodName, this._param
//     );
//   }
  //end Employee Notes
}
