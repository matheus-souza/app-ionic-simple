import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserProvider} from "../../providers/user/user";
import {ProfileProvider} from "../../providers/profile/profile";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    UserProvider,
    ProfileProvider,
    Camera,
    Geolocation
  ]
})
export class HomePage {

  public users = [];
  public profiles = [];

  public user = {"_id":"", "name":"", "email":"", "profile":"", "photo":"", "latitude":null, "longitude":null};
  public userDefault = {"_id":"", "name":"", "email":"", "profile":"", "photo":"", "latitude":null, "longitude":null};

  constructor(public navCtrl: NavController, private userService:UserProvider, private profileService:ProfileProvider, private camera: Camera, private geolocation: Geolocation) {
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
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.latitude = resp.coords.latitude;
      this.user.longitude = resp.coords.longitude;

      if (this.user._id == "") {
        this.userService.save(this.user).subscribe(respose => this.getUsers());
      } else {
        this.userService.update(this.user).subscribe(respose => this.getUsers());
      }

      this.user = this.userDefault;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
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

  public takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.user.photo = base64Image;
    }, (err) => {
      // Handle error
    });
  }

}
