import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  public urlProfile = "http://localhost/api/profile";

  constructor(public http: HttpClient) {
    console.log('Hello ProfileProvider Provider');
  }

}
