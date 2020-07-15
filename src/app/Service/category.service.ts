import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Category/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetMainCategory(_obj: any): Observable<any> {
    this._methodName = "GetMainCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllMainCategory(_obj: any): Observable<any> {
    this._methodName = "GetAllMainCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveMainCategory(_obj: any): Observable<any> {
    this._methodName = "SaveMainCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetCategory(_obj: any): Observable<any> {
    this._methodName = "GetCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllCategory(_obj: any): Observable<any> {
    this._methodName = "GetAllCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveCategory(_obj: any): Observable<any> {
    this._methodName = "SaveCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetSubCategory(_obj: any): Observable<any> {
    this._methodName = "GetSubCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllSubCategory(_obj: any): Observable<any> {
    this._methodName = "GetAllSubCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveSubCategory(_obj: any): Observable<any> {
    this._methodName = "SaveSubCategory/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
