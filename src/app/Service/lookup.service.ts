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
  GetLookupMasterById(obj: any): Observable<any> {
    this._methodName = "GetLookupMasterById/";
    this._param = obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetAllClientType(): Observable<any> {
    this._methodName = "GetAllClientType/";
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

  GetAllUnion(): Observable<any> {
    this._methodName = "GetAllUnion/";
    this._param = {};
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetWorksCompCodesByEmpId(_obj: any): Observable<any> {
    this._methodName = "GetWorksCompCodesByEmpId/";
    this._param = _obj
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetModuleCategories(_obj: any): Observable<any> {
    this._methodName = "GetModuleCategories/";
    this._param = _obj
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetRoles(_obj: any): Observable<any> {
    this._methodName = "GetRoles/";
    this._param = _obj
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveRole(_obj: any): Observable<any> {
    this._methodName = "SaveRole/";
    this._param = _obj
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
}
