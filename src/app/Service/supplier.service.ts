import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Supplier/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetSupplier(obj: any): Observable<any> {
    this._methodName = "GetSupplier/";
    this._param = obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetAllSupplier(): Observable<any> {
    this._methodName = "GetAllSupplier/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveSupplier(_obj: any): Observable<any> {
    this._methodName = "SaveSupplier/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

}
