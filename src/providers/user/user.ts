import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  public urlUser = "http://localhost/api/user";

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  public findAll():Observable<any> {
    return this.http.get(this.urlUser);
  }

  public save(user):Observable<any> {
    return this.http.post(this.urlUser, user);
  }

  public update(user):Observable<any> {
    return this.http.put(this.urlUser + "/" + user._id, user);
  }

  public delete(id):Observable<any> {
    return this.http.delete(this.urlUser + "/" + id);
  }
}
