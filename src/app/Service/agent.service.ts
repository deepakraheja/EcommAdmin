import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Agent/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  AgentRegistration(_obj: any): Observable<any> {
    this._methodName = "AgentRegistration/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  UpdateAgent(_obj: any): Observable<any> {
    this._methodName = "UpdateAgent/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAgentInfo(_obj: any): Observable<any> {
    this._methodName = "GetAgentInfo/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveAgentCustomer(_obj: any): Observable<any> {
    this._methodName = "SaveAgentCustomer/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  ValidAgentLogin(_obj: any): Observable<any> {
    this._methodName = "ValidAgentLogin/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
