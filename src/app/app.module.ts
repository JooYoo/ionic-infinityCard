import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LibraryPage } from '../pages/library/library';
import { CubePage } from '../pages/cube/cube';
import { InfinityPage } from '../pages/infinity/infinity';
import { CardServiceProvider } from '../providers/card-service/card-service';
import { CardsPage } from '../pages/library/cards/cards';
import { CardEditPage } from '../pages/library/cards/card-edit/card-edit';
import { CardBagAddPage } from '../pages/library/card-bag-add/card-bag-add';
import { CardAddPage } from '../pages/library/cards/card-add/card-add';
import { CardBagEditPage } from '../pages/library/card-bag-edit/card-bag-edit';
import { SwipePage } from '../pages/swipe/swipe';

import { SwipeCardsModule } from 'ng2-swipe-cards'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SwipeServiceProvider } from '../providers/swipe-service/swipe-service';
import { CubeListPage } from '../pages/library/cube-list/cube-list';



@NgModule({
  declarations: [
    MyApp,
    SwipePage,
    LibraryPage,
    CardBagAddPage,
    CardBagEditPage,
    CardsPage,
    CardEditPage,
    CardAddPage,
    CubePage,
    InfinityPage,
    SettingsPage,
    CubeListPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    SwipeCardsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SwipePage,
    LibraryPage,
    CardBagAddPage,
    CardBagEditPage,
    CubePage,
    CardsPage,
    CardEditPage,
    CardAddPage,
    InfinityPage,
    SettingsPage,
    CubeListPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CardServiceProvider,
    SwipeServiceProvider
  ]
})
export class AppModule {}
