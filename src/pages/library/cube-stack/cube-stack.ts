import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, ModalController, PopoverController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { CubeContentEditPage } from './cube-content-edit/cube-content-edit';
import { CubeContentAddPage } from './cube-content-add/cube-content-add';
import { LibraryPage } from '../library';
import { PopoverComponent } from '../../../components/popover/popover';


@Component({
  selector: 'page-cube-stack',
  templateUrl: 'cube-stack.html',
})
export class CubeStackPage {

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
    let addModal = this.modalControl.create(CubeContentAddPage, { cubeBagInfo: this.cubeBag })
    addModal.present()
  }

  openEditModal(cube) {
    let editModal = this.modalControl.create(CubeContentEditPage, { cubeInfo: cube })
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
