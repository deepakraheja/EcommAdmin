import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Order/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};

  constructor(private _http: HttpClient) { }

  GetAllOrder(_Obj: any): Observable<any> {
    this._methodName = "GetAllOrder";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  UpdateOrderDetailStatus(_Obj: any): Observable<any> {
    this._methodName = "UpdateOrderDetailStatus";
    this._param = _Obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetDashboardSummary(): Observable<any> {
    this._methodName = "GetDashboardSummary";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
