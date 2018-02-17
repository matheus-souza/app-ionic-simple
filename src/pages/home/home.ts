import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {ProfileProvider} from "../../providers/profile/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    UserProvider,
    ProfileProvider
  ]
})
export class HomePage {

  public users = [];
  public profiles = [];

  public user = {"_id":"", "name":"", "email":"", "profile":""};

  constructor(public navCtrl: NavController, private userService:UserProvider, private profileService:ProfileProvider) {
    this.getUsers();
    this.getProfiles();
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

    this.user = {"_id":"", "name":"", "email":"", "profile":""};
  }

  public deleteUser(id) {
    this.userService.delete(id).subscribe(respose => this.getUsers());
  }

  public compareFn(e1: any, e2: any): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  public getProfiles() {
    this.profileService.findAll().subscribe(response => this.profiles = response);
  }

}
