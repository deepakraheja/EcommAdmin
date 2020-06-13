import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../Service/local-storage.service';
import { UserService } from '../Service/user.service';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public User = [];
  IsLoggedIn: boolean;
  private BASE_API_URL = environment.BASE_API_URL;
  private _controllerName: string = "User/";
  private _url: string = this.BASE_API_URL + this._controllerName;
  private _methodName: string = "";
  private _param: {};


  constructor(private router: Router,
    private _LocalStorage: LocalStorageService,
 
    private _UserService: UserService,
   
    private _http: HttpClient) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    var pathArray = window.location.pathname.split('/');
    let path = pathArray[1];

    let UserObj = {
      PageName: path,
    }
    this._methodName = "GetUserAccess/";
    this._param = UserObj;
    return this._http.post<any>(this._url + this._methodName, this._param).pipe(
      map(res => {
        
        // 
        this.User = res;
        if (res != null) {
          if (this.User.length > 0) {
            console.log(this.User)
           //  
            this._LocalStorage.storeOnLocalStorage("PageName", this.User[0].pageName.toString());
            this._LocalStorage.storeOnLocalStorage("CanAdd", this.User[0].canAdd.toString());
            this._LocalStorage.storeOnLocalStorage("CanUpdate", this.User[0].canUpdate.toString());
            this._LocalStorage.storeOnLocalStorage("CanDelete", this.User[0].canDelete.toString());
            this._LocalStorage.storeOnLocalStorage("ViewOnly", this.User[0].viewOnly.toString());

            return true;

          }
          else {
            this.router.navigate(['/unauth']);
            return false;
          }
        }
        else {
          this.router.navigate(['/unauth']);
          return false;
        }
      }),
    );
  }
}
