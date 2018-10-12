import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';
import { CubeBag } from '../../../app/Model/CubeBag';


@Component({
  selector: 'page-cube-list',
  templateUrl: 'cube-list.html',
})
export class CubeListPage {

  cubeBag: CubeBag

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
      this.cubeBag = navParams.get('itemInfo')
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }

}
