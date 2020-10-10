import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Lookup/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetActiveColor(): Observable<any> {
    this._methodName = "GetActiveColor/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetActiveSize(): Observable<any> {
    this._methodName = "GetActiveSize/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  
  GetOrderStatus(): Observable<any> {
    this._methodName = "GetOrderStatus/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetHSN(): Observable<any> {
    this._methodName = "GetHSN/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
