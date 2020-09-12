import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) { }
  public storeOnLocalStorage(_key: string, _value: string): void {
    this.storage.set(_key, _value);
  }
  public getValueOnLocalStorage(_key: string): string {
    return this.storage.get(_key);
  }
  public removeStoreOnLocalStorage(_key: string): void {
    this.storage.remove(_key);
  }
  public removeAllLocalStorage(): void {
    debugger
    this.storage.remove("FirstName");
    this.storage.remove("LastName");

    this.storage.remove("LoggedInUserId");
    this.storage.remove("LoggedInUserType");
    this.storage.remove("pageIndex");
    this.storage.remove("statusId");
    this.storage.remove("yrsValue");
    this.storage.remove("IsPostBack");
    this.storage.remove("Token");

    //this.storage.remove("LoggedInAgentId");
  }
}
