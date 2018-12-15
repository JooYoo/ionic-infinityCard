import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { LibraryPage } from '../library';


@Component({
  selector: 'page-cube-stack-add',
  templateUrl: 'cube-stack-add.html',
})
export class CubeStackAddPage {

  titleCn: string
  titleDe: string
  tabInfo: string

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public cardService: CardServiceProvider) {
  }

  dismiss(){
   // this.viewCtrl.dismiss()
    this.tabInfo="cube"
    this.navCtrl.push(LibraryPage,{tabInfo:this.tabInfo})
  }

  addCubeStack(){
    this.cardService.addCubeStack(this.titleCn, this.titleDe, "icon")
  }
}
