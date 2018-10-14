import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';


@Component({
  selector: 'page-cube-bag-add',
  templateUrl: 'cube-bag-add.html',
})
export class CubeBagAddPage {

  titleCn: string
  titleDe: string

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public cardService: CardServiceProvider) {
  }

  dismiss(){
    this.viewCtrl.dismiss()
  }

  addCubeBag(){
    this.cardService.addCubeBag(this.titleCn, this.titleDe, "icon")
    
  }

}
