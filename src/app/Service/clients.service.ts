import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Clients/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetClients(_obj: any): Observable<any> {
    this._methodName = "GetClients/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveClients(_obj: any): Observable<any> {
    this._methodName = "SaveClients/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetClientbyclientId(_obj: any): Observable<any> {
    this._methodName = "GetClientbyclientId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetClientsByBranchId(_obj: any): Observable<any> {
    this._methodName = "GetClientsByBranchId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveEmployeeClientExclusion(_obj: any): Observable<any> {
    this._methodName = "SaveEmployeeClientExclusion/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetClientByVenueID(_obj: any): Observable<any> {
    this._methodName = "GetClientByVenueID/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetAllClientNotInVenueClients(_obj: any): Observable<any> {
    this._methodName = "GetAllClientNotInVenueClients/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
