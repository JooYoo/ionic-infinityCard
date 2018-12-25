import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';

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
    this.viewCtrl.dismiss()
  }

  addCubeStack(){
    this.cardService.addCubeStack(this.titleCn, this.titleDe, "icon")
  }
}
