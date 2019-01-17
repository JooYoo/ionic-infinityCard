import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any
  

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    storageService: StorageServiceProvider,
    ) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

      
      // storageService.initStorage().then(() => this.rootPage = TabsPage)
      this.rootPage = TabsPage
    });
  }

  
}
