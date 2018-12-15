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
import { CardStackAddPage } from '../pages/library/card-stack-add/card-stack-add';
import { CardAddPage } from '../pages/library/cards/card-add/card-add';
import { SwipePage } from '../pages/swipe/swipe';

import { SwipeCardsModule } from 'ng2-swipe-cards'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SwipeServiceProvider } from '../providers/swipe-service/swipe-service';
import { CubeContentPage } from '../pages/library/cube-list/cube-content';

import { CubeStackAddPage } from '../pages/library/cube-stack-add/cube-stack-add';
import { CubeContentAddPage } from '../pages/library/cube-list/cube-content-add/cube-content-add';
import { CubeEditPage } from '../pages/library/cube-list/cube-edit/cube-edit';
import { PopoverComponent } from '../components/popover/popover';
import { CubeListIconComponent} from '../components/cube-list-icon/cube-list-icon';




@NgModule({
  declarations: [
    MyApp,
    SwipePage,
    LibraryPage,
    CardStackAddPage,
    CardsPage,
    CardEditPage,
    CardAddPage,
    CubePage,
    InfinityPage,
    SettingsPage,
    CubeContentPage,
    CubeStackAddPage,
    CubeContentAddPage,
    CubeEditPage,
    TabsPage,
    PopoverComponent,
    CubeListIconComponent
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
    CardStackAddPage,
    CubePage,
    CardsPage,
    CardEditPage,
    CardAddPage,
    InfinityPage,
    SettingsPage,
    CubeContentPage,
    CubeStackAddPage,
    CubeContentAddPage,
    CubeEditPage,
    TabsPage,
    PopoverComponent
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
