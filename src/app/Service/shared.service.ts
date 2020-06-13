import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Shared/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetAllStates(): Observable<any> {
    this._methodName = "GetAllStates/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetAllLookupMaster(): Observable<any> {
    this._methodName = "GetAllLookupMaster/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllStatusById(objStatusType: any): Observable<any> {
    this._methodName = "GetAllStatusById/";
    this._param = objStatusType;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
