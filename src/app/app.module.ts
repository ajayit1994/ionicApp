import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
// import { ItemDetailsPage } from '../pages/item-details/item-details';
// import { ListPage } from '../pages/list/list';
import { Users } from '../pages/users/users';
import { UserChat } from '../pages/user-chat/user-chat';
import { AddUser } from '../pages/add-user/add-user';

import { User } from '../providers/user';
import { Socket } from '../providers/socket';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AddUser,
    Users,
    UserChat
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Users,
    UserChat,
    AddUser
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    User,
    Socket
  ]
})
export class AppModule {}
