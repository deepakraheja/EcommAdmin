import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "EmailTemplate/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  SaveEmailTemplate(_obj: any): Observable<any> {
    this._methodName = "SaveEmailTemplate/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetEmailTemplate(_obj: any): Observable<any> {
    this._methodName = "GetEmailTemplate/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

}
