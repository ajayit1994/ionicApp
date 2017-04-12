import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Socket } from '../../providers/socket';

/**
 * Generated class for the UserChat page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-user-chat',
  templateUrl: 'user-chat.html',
})
export class UserChat {

    private user : any;
    private messages : Object = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private socket : Socket) {
    this.user = navParams.get('user');
    this.socket.on('selectedUserMsgList', (data) =>{
        this.messages = data.messages;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserChat');
  }

}
