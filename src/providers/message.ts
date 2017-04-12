import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Message provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Message {

  constructor() {
    console.log('Hello Message Provider');
  }

}
