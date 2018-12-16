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
import { CardStackPage } from '../pages/library/card-stack/card-stack';
import { CardContentEditPage } from '../pages/library/card-stack/card-content-edit/card-content-edit';
import { CardStackAddPage } from '../pages/library/card-stack-add/card-stack-add';
import { CardContentAddPage } from '../pages/library/card-stack/card-content-add/card-content-add';
import { SwipePage } from '../pages/swipe/swipe';

import { SwipeCardsModule } from 'ng2-swipe-cards'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { SwipeServiceProvider } from '../providers/swipe-service/swipe-service';
import { CubeStackPage } from '../pages/library/cube-stack/cube-stack';

import { CubeStackAddPage } from '../pages/library/cube-stack-add/cube-stack-add';
import { CubeContentAddPage } from '../pages/library/cube-stack/cube-content-add/cube-content-add';
import { CubeContentEditPage } from '../pages/library/cube-stack/cube-content-edit/cube-content-edit';
import { PopoverComponent } from '../components/popover/popover';
import { CubeListIconComponent} from '../components/cube-list-icon/cube-list-icon';




@NgModule({
  declarations: [
    MyApp,
    SwipePage,
    LibraryPage,
    CardStackAddPage,
    CardStackPage,
    CardContentEditPage,
    CardContentAddPage,
    CubePage,
    InfinityPage,
    SettingsPage,
    CubeStackPage,
    CubeStackAddPage,
    CubeContentAddPage,
    CubeContentEditPage,
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
    CardStackPage,
    CardContentEditPage,
    CardContentAddPage,
    InfinityPage,
    SettingsPage,
    CubeStackPage,
    CubeStackAddPage,
    CubeContentAddPage,
    CubeContentEditPage,
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
