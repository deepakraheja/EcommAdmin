import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricService {

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Fabric/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  /// LookupFabric
  GetFabric(_obj: any): Observable<any> {
    this._methodName = "GetFabric/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllFabric(_obj: any): Observable<any> {
    this._methodName = "GetAllFabric/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveFabric(_obj: any): Observable<any> {
    this._methodName = "SaveFabric/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  /// LookupFabricType
  GetFabricType(_obj: any): Observable<any> {
    this._methodName = "GetFabricType/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllFabricType(_obj: any): Observable<any> {
    this._methodName = "GetAllFabricType/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveFabricType(_obj: any): Observable<any> {
    this._methodName = "SaveFabricType/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
