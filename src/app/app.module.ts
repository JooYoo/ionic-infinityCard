import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import{ SQLite } from '@ionic-native/sqlite'
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SwipeServiceProvider } from '../providers/swipe-service/swipe-service';
import { CubeStackPage } from '../pages/library/cube-stack/cube-stack';

import { CubeStackAddPage } from '../pages/library/cube-stack-add/cube-stack-add';
import { CubeContentAddPage } from '../pages/library/cube-stack/cube-content-add/cube-content-add';
import { CubeContentEditPage } from '../pages/library/cube-stack/cube-content-edit/cube-content-edit';
import { PopoverComponent } from '../components/popover/popover';
import { CubeListIconComponent } from '../components/cube-list-icon/cube-list-icon';
import { MistakePage } from '../pages/swipe/mistake/mistake'
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { IonicStorageModule } from '@ionic/storage';
import { SqlStorageProvider } from '../providers/sql-storage/sql-storage';
import { DbServiceProvider } from '../providers/db-service/db-service';
import { ChartPage } from '../pages/chart/chart';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Chart } from 'chart.js';

@NgModule({
  declarations: [
    MyApp,
    SwipePage,
    MistakePage,
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
    ChartPage,
    TabsPage,
    PopoverComponent,
    CubeListIconComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    SwipeCardsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SwipePage,
    MistakePage,
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
    ChartPage,
    TabsPage,
    PopoverComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CardServiceProvider,
    SwipeServiceProvider,
    StorageServiceProvider,
    SqlStorageProvider,
    DbServiceProvider
  ]
})
export class AppModule { }
