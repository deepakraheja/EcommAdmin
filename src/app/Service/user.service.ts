import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Users/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  ValidLogin(_obj: any): Observable<any> {
    this._methodName = "ValidLogin/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllUsers(): Observable<any> {
    this._methodName = "GetAllUsers/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  UpdateUser(_Obj: any): Observable<any> {
    this._methodName = "UpdateUser";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAgentCustomer(_Obj: any): Observable<any> {
    this._methodName = "GetAgentCustomer";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAgentCustomerByAgentId(_Obj: any): Observable<any> {
    this._methodName = "GetAgentCustomerByAgentId";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  AgentCustomerStatusChange(_Obj: any): Observable<any> {
    this._methodName = "AgentCustomerStatusChange";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

}