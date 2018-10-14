import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding } from 'ionic-angular';
import { CubeBag } from '../../../app/Model/CubeBag';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { Cube } from '../../../app/Model/Cube';


@Component({
  selector: 'page-cube-list',
  templateUrl: 'cube-list.html',
})
export class CubeListPage {

  cubeBag: CubeBag

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public cardService: CardServiceProvider) {
      this.cubeBag = navParams.get('itemInfo')
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }

  removeCube(cube: Cube){
    this.cardService.removeCube(cube,this.cubeBag)
  }
}
