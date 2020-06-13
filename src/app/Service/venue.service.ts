import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "Venue/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};
  constructor(private _http: HttpClient) { }

  GetVenues(_obj: any): Observable<any> {
    this._methodName = "GetVenues/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  GetVenueByVenueId(_obj: any): Observable<any> {
    this._methodName = "GetVenueByVenueId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  
  SaveVenue(_obj: any): Observable<any> {
    this._methodName = "SaveVenue/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  GetVenueByBranchId(_obj: any): Observable<any> {
    this._methodName = "GetVenueByBranchId/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  SaveEmployeeVenueExclusion(_obj: any): Observable<any> {
    this._methodName = "SaveEmployeeVenueExclusion/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  SaveVenueClients(_obj: any): Observable<any> {
    this._methodName = "SaveVenueClients/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }

  DeleteVenueClients(_obj: any): Observable<any> {
    this._methodName = "DeleteVenueClients/";
    this._param = _obj;
    return this._http.post<any>(
      this._url + this._methodName, this._param
    );
  }
  
}
