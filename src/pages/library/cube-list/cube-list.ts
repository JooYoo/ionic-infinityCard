import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, ModalController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { CubeEditPage } from './cube-edit/cube-edit';
import { CubeAddPage } from './cube-add/cube-add';


@Component({
  selector: 'page-cube-list',
  templateUrl: 'cube-list.html',
})
export class CubeListPage {

  cubeBag: any

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalControl: ModalController,
              public cardService: CardServiceProvider) {
      this.cubeBag = navParams.get('itemInfo')
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }

  openAddModal(){
    console.log("test")
    let addModal = this.modalControl.create(CubeAddPage,{cubeBagInfo: this.cubeBag})
    addModal.present()
  }

  openEditModal(cube){
    let editModal = this.modalControl.create(CubeEditPage,{cubeInfo: cube})
    editModal.present()
  }

  removeCube(cube){
    this.cardService.removeCube(cube,this.cubeBag)
  }
}
