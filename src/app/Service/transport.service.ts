import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Transport/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetTransport(obj: any): Observable<any> {
    this._methodName = "GetTransport/";
    this._param = obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllTransport(): Observable<any> {
    this._methodName = "GetAllTransport/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveTransport(_obj: any): Observable<any> {
    this._methodName = "SaveTransport/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

}
