import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../Service/local-storage.service';
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _LocalStorage: LocalStorageService, private _router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 
        // add authorization header with jwt token if available      

      
        let Token = this._LocalStorage.getValueOnLocalStorage('Token');

        if (this._LocalStorage.getValueOnLocalStorage('Token') != null) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${Token}`
                }

            });

            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401) {
                            this._LocalStorage.removeAllLocalStorage();
                            this._router.navigateByUrl('/adminlogin');
                        }
                    }
                )
            );
        }
        else
        {
            this._LocalStorage.removeAllLocalStorage();
            this._router.navigateByUrl('/adminlogin');
            return next.handle(req.clone());
            
        }
    }
}

