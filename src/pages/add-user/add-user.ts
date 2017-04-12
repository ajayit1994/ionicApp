import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// custom service
import { User } from '../../providers/user';
// custom component
import { Users } from '../users/users';

/**
 * Generated class for the AddUser page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
})
export class AddUser {

    private userName : String = ''
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService : User) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddUser');
  }

  onInputKeypress({keyCode}: KeyboardEvent) {
    if (keyCode == 13) {
        this.addUser(this.userName);
        this.navCtrl.push(Users, {
            userName : this.userName
        });
    }
  }

  addUser(userName) {
      this.userService.setUserName(userName);
  }

}
