import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class User {

    private userName;
    private userSocketId
    private selectedUserId;
    private selectedUserName;
    private socket;
    private apiUrl = 'http://localhost:3020';
    constructor() {
        console.log('Hello User Provider');
    }

    // set user name at the application level
    setUserName(userName) {
        this.userName = userName;
    }

    setSocketId(socketId) {
        this.userSocketId = socketId
    }

    getSocketId() {
        return this.userSocketId;
    }

    // get the user name of the application level
    getUserName() {
        return this.userName;
    }

    // set the list of selected user at application level
    setSelectedUser(userId, userName) {
        this.selectedUserId = userId;
        this.selectedUserName = userName;
    }

    // get the selected user by user at application level
    getSelectedUser() {
        return {
            selectedUserId: this.selectedUserId,
            selectedUserName: this.selectedUserName
        }
    }

}
