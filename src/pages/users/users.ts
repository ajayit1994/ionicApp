import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { UserChat } from '../user-chat/user-chat';
import { Socket } from '../../providers/socket';
import { User } from '../../providers/user';


/**
 * Generated class for the Users page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class Users {

private users = [];
private userName : String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public socket : Socket, public user : User) {

      this.userName = navParams.get('userName');

      this.socket.emit('userName', this.userName);
      
      this.socket.on('userList', (userList, socketId) => {
        this.users = userList;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }

  itemTapped(event, user) {
      let data = {
          from : this.userName,
          to : user.userName
      }
      this.socket.emit('selectedUserMsg', data);
    this.navCtrl.push(UserChat, {
        user : user
    })
  }

}
