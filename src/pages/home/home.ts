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

  public user = {"name":"", "email":""};

  constructor(public navCtrl: NavController, private userService:UserProvider) {
    this.getUsers();
  }

  public getUsers() {
    this.userService.findAll().subscribe(response => this.users = response);
  }
}
