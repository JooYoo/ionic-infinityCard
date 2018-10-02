import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StandardPage } from '../pages/standard/standard';
import { LibraryPage } from '../pages/library/library';
import { CubePage } from '../pages/cube/cube';
import { InfinityPage } from '../pages/infinity/infinity';
import { CardServiceProvider } from '../providers/card-service/card-service';
import { CardsPage } from '../pages/library/cards/cards';
import { CardBagDetailPage } from '../pages/library/card-bag-detail/card-bag-detail';
import { CardEditPage } from '../pages/library/cards/card-edit/card-edit';


@NgModule({
  declarations: [
    MyApp,
    StandardPage,
    LibraryPage,
    CardBagDetailPage,
    CardsPage,
    CardEditPage,
    CubePage,
    InfinityPage,
    SettingsPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StandardPage,
    LibraryPage,
    CardBagDetailPage,
    CubePage,
    CardsPage,
    CardEditPage,
    InfinityPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CardServiceProvider
  ]
})
export class AppModule {}
