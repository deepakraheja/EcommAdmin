import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConstantsService {

  role: string = 'test';
  ProfilePic="small"
  constructor() { }
  
}
