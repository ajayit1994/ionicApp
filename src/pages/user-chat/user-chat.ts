import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Socket } from '../../providers/socket';
import { User } from '../../providers/user';
import * as moment from 'moment/moment';

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
export class UserChat implements OnInit {

    private messages = {};
    private msgs = [];
    private message;
    private userName;
    private socket;
    private selectedUserName;
    private user: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private socketService: Socket, private userService: User) {
        this.user = navParams.get('user');
    }

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // get user name which is login from userService
        this.userName = this.userService.getUserName();
        // get socket instance from socketService
        this.socket = this.socketService.getSocket();
        // get selected user for chat using userservice
        this.selectedUserName = this.userService.getSelectedUser().selectedUserName;

        this.socketService.on('sendMsg', (data) => {
            //this.messages.push(data.msg);
            if (this.messages[data.from] == undefined) {
                this.messages[data.from] = [];
                let m = {
                    message : data.msg,
                    timeStamp  : data.timeStamp
                }
                this.messages[data.from].push(m);
                this.msgs = this.messages[data.from];
            } else {
                let m = {
                    message : data.msg,
                    timeStamp  : data.timeStamp
                }
                this.messages[data.from].push(m);
                this.msgs = this.messages[data.from];
            }

        });

        this.socketService.on('selectedUserMsgList', (data) => {
            this.messages[data.to] = [];
            this.messages[data.to] = data.messages;
            this.msgs = this.messages[data.to];
        });


    }

    sendMsg($event) {
        const selectedUserId = this.userService.getSelectedUser().selectedUserId;
        const selectedUserName = this.userService.getSelectedUser().selectedUserName;
        const socketId = this.userService.getSocketId();
        switch (typeof $event) {
            case 'object': {
                const keyCode = $event.which || $event.keyCode;
                if (keyCode === 13 && this.message !== null) {
                    this.socketService.emit('getMsg', {
                        toid: selectedUserId,
                        fromId: socketId,
                        msg: this.message,
                        from: this.userName,
                        to: selectedUserName
                    });
                    this.messages[selectedUserName].push({
                        message :this.userName + ' : ' + this.message,
                        timeStamp : moment(new Date()).format('h:mm a')
                    });
                    this.msgs = this.messages[selectedUserName];
                    this.message = null;
                }
                 break;
            }
            case 'string': {
                this.socketService.emit('getMsg', {
                    toid: selectedUserId,
                    fromId: socketId,
                    msg: this.message,
                    from: this.userName,
                    to: selectedUserName
                });
                this.messages[selectedUserName].push({
                        message :this.userName + ' : ' + this.message,
                        timeStamp : moment(new Date()).format('h:mm a')
                    });
                this.msgs = this.messages[selectedUserName];
                this.message = null;
            }
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UserChat');
    }

}
