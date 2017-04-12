import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/map';

/*
  Generated class for the Socket provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Socket {

    private socket;
  constructor() {
    console.log('Hello Socket Provider');
    this.socket = io.connect('http://localhost:3020');
  }
   // this will give socket instance as a singleton
    getSocket() {
        return this.socket;
    }

    // listen event
    on (eventName, callback) {
        this.socket.on(eventName, function () {
            let args = arguments;
            callback.apply(this.socket, args);
        })
    }

    // broadcast event
    emit (eventName, data) {
        this.socket.emit(eventName, data, function () {
        });
    }

}
