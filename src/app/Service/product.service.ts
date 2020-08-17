import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Product/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetAllProductBySupplierId(_obj: any): Observable<any> {
    this._methodName = "GetAllProductBySupplierId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetProductById(_obj: any): Observable<any> {
    this._methodName = "GetProductById/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveProduct(_obj: any): Observable<any> {
    this._methodName = "SaveProduct/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveProductSizeColor(_obj: any): Observable<any> {
    this._methodName = "SaveProductSizeColor/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveProductSizeColorImages(_obj: any): Observable<any> {
    this._methodName = "SaveProductSizeColorImages/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetProductSizeColorById(_obj: any): Observable<any> {
    this._methodName = "GetProductSizeColorById/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  
  DeleteProductSizeColor(_obj: any): Observable<any> {
    this._methodName = "DeleteProductSizeColor/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  DeleteProductImage(_obj: any): Observable<any> {
    this._methodName = "DeleteProductImage/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
