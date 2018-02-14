import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    UserProvider
  ]
})
export class HomePage {

  public users = [];

  public user = {"_id":"", "name":"", "email":""};

  constructor(public navCtrl: NavController, private userService:UserProvider) {
    this.getUsers();
  }

  public getUsers() {
    this.userService.findAll().subscribe(response => this.users = response);
  }

  public populateForm(user) {
    this.user = user;
  }

  public saveUser() {
    if (this.user._id == "") {
      this.userService.save(this.user).subscribe(respose => this.getUsers());
    } else {
      this.userService.update(this.user).subscribe(respose => this.getUsers());
    }

    this.user = {"_id":"", "name":"", "email":""};
  }

  public deleteUser(id) {
    this.userService.delete(id).subscribe(respose => this.getUsers());
  }

}
