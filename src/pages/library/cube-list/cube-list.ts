import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, ModalController, PopoverController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { CubeEditPage } from './cube-edit/cube-edit';
import { CubeAddPage } from './cube-add/cube-add';
import { LibraryPage } from '../library';
import { PopoverComponent } from '../../../components/popover/popover';


@Component({
  selector: 'page-cube-list',
  templateUrl: 'cube-list.html',
})
export class CubeListPage {

  cubeBag: any
  tabInfo: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public modalControl: ModalController,
    public cardService: CardServiceProvider) {

    this.cubeBag = navParams.get('itemInfo')
    this.tabInfo = "cube"
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverComponent, { cubeStackInfo: this.cubeBag });
    popover.present({
      ev: ev
    });
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }

  openAddModal() {
    console.log("test")
    let addModal = this.modalControl.create(CubeAddPage, { cubeBagInfo: this.cubeBag })
    addModal.present()
  }

  openEditModal(cube) {
    let editModal = this.modalControl.create(CubeEditPage, { cubeInfo: cube })
    editModal.present()
  }

  removeCube(cube) {
    this.cardService.removeCube(cube, this.cubeBag)
  }

  editCubeBag() {
    this.cardService.editCubeBag(this.cubeBag, this.cubeBag.titleCn, this.cubeBag.titleDe);
    this.navCtrl.push(LibraryPage, { tabInfo: this.tabInfo });
  }

}
