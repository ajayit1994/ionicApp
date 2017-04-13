import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    private userName: String;
    private socketId;
    private socket;
    constructor(public navCtrl: NavController, public navParams: NavParams, public socketService: Socket, public userService: User) {

        this.userName = navParams.get('userName');

        this.socket = this.socketService.getSocket();

        this.socket.emit('userName', this.userName);

        this.socket.on('userList', (userList, socketId) => {
            if (this.socketId == null) {
                this.socketId = socketId;
            }
            this.userService.setSocketId(this.socketId);
            // remove the user from user list who is login
            userList = userList.filter( (user) => {
                return user.userName != this.userName;
            })
            this.users = userList;
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Users');
    }

    itemTapped(event, user) {
        this.userService.setSelectedUser(user.id, user.userName);
        let data = {
            from: this.userName,
            to: user.userName,
            toUserId : user.id,
            fromUserId : this.socketId
        }
        this.socket.emit('selectedUserMsg', data);
        this.navCtrl.push(UserChat, {
            user: user
        })
    }

}
