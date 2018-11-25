import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CubeBag } from '../../../app/Model/CubeBag';
import { CardServiceProvider } from '../../../providers/card-service/card-service';

@Component({
  selector: 'page-cube-bag-edit',
  templateUrl: 'cube-bag-edit.html',
})
export class CubeBagEditPage {

  cubeBag: CubeBag

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController,
              public cardService: CardServiceProvider) {

            this.cubeBag = navParams.get('itemInfo')
  }

  dismiss(){
    this.viewControl.dismiss()
  }

  editCubeBag(){
    this.cardService.editCubeBag(this.cubeBag, this.cubeBag.titleCn, this.cubeBag.titleDe)
  }
 

}
