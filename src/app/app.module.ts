import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StandardPage } from '../pages/standard/standard';
import { LibraryPage } from '../pages/library/library';
import { CubePage } from '../pages/cube/cube';
import { InfinityPage } from '../pages/infinity/infinity';


@NgModule({
  declarations: [
    MyApp,
    StandardPage,
    LibraryPage,
    CubePage,
    InfinityPage,
    SettingsPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StandardPage,
    LibraryPage,
    CubePage,
    InfinityPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
