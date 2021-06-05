import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public SelectedValue: any = this._LocalStorage.getValueOnLocalStorage("Selected");
  private GetSelectedValue = new BehaviorSubject(this.SelectedValue);
  val = this.GetSelectedValue.asObservable();
  constructor(
    private _LocalStorage: LocalStorageService
  ) { }

  SelectedValueChange(_val: any) {
    this.GetSelectedValue.next(_val);
  }
}
