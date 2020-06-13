import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "User/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  AdminLogin(_obj: any): Observable<any> {
    this._methodName = "ValidateUser/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  UserAccess(_obj: any): Observable<any> {
    this._methodName = "GetUserAccess/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetBranchByUserId(_obj: any): Observable<any> {
    this._methodName = "GetBranchByUserId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetDeptByBranchId(_obj: any): Observable<any> {
    this._methodName = "GetDeptByBranchId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetJobTitleByJobTitleID(_obj: any): Observable<any> {
    this._methodName = "GetJobTitleByJobTitleID/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetWorkGroupByBranchId(_obj: any): Observable<any> {
    this._methodName = "GetWorkGroupByBranchId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetEmployeeManager(_obj: any): Observable<any> {
    this._methodName = "GetEmployeeManager/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );    
  }
  UsersESSLogin(_obj: any): Observable<any> {
    this._methodName = "UsersESSLogin/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );    
  }
  UsersESSReset(_obj: any): Observable<any> {
    this._methodName = "UsersESSReset/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );    
  }
  UsersESSBlocked(_obj: any): Observable<any> {
    this._methodName = "UsersESSBlocked/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );    
  }
  EssBulkMail(_obj: any[]): Observable<any> {
    this._methodName = "EssBulkMail/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );    
  }
  
}