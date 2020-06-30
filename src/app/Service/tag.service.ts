import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Tag/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  /// LookupFabric
  GetTag(_obj: any): Observable<any> {
    this._methodName = "GetTag/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllTag(_obj: any): Observable<any> {
    this._methodName = "GetAllTag/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveTag(_obj: any): Observable<any> {
    this._methodName = "SaveTag/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
