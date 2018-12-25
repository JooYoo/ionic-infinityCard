import { Component } from '@angular/core';
import { NavController, NavParams, ItemSliding, ModalController, PopoverController, ViewController, ToastController } from 'ionic-angular';
import { CardServiceProvider } from '../../../providers/card-service/card-service';
import { CubeContentEditPage } from './cube-content-edit/cube-content-edit';
import { CubeContentAddPage } from './cube-content-add/cube-content-add';
import { LibraryPage } from '../library';
import { PopoverComponent } from '../../../components/popover/popover';
import { CubePage } from '../../../pages/cube/cube';


@Component({
  selector: 'page-cube-stack',
  templateUrl: 'cube-stack.html',
})
export class CubeStackPage {

  cubeStack: any
  tabInfo: any
  toast:any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public modalControl: ModalController,
    public cardService: CardServiceProvider,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController) {

    this.cubeStack = navParams.get('itemInfo')
    this.tabInfo = "cube"
  }

  toastSetting(){
    this.toast = this.toastCtrl.create({
      message: this.cubeStack.titleDe + ' has been removed',
      duration:3000,
      position:'top',
      closeButtonText:"X",
      showCloseButton: true,
    })
  }

  presentPopover(ev) {
    this.toastSetting()

    let popover = this.popoverCtrl.create(PopoverComponent, { cubeStackInfo: this.cubeStack });
    popover.present({
      ev: ev
    });

    popover.onDidDismiss(()=>{
      this.cardService.removeCubeBag(this.cubeStack)
      this.toast.present()
      this.viewCtrl.dismiss()
    })
  }

  closeSlidingItem(slidingItem: ItemSliding) {
    slidingItem.close()
  }

  openAddModal() {
    let addModal = this.modalControl.create(CubeContentAddPage, { cubeBagInfo: this.cubeStack })
    addModal.present()
  }

  openEditModal(cube) {
    let editModal = this.modalControl.create(CubeContentEditPage, { cubeInfo: cube, cubeStackInfo: this.cubeStack })
    editModal.present()
  }

  removeCube(cube) {
    this.cardService.removeCube(cube, this.cubeStack)
  }

  editCubeStack() {
    this.cardService.editCubeBag(this.cubeStack, this.cubeStack.titleCn, this.cubeStack.titleDe);
    this.navCtrl.push(LibraryPage, { tabInfo: this.tabInfo });
  }

  toStudyCubePage(){
     this.navCtrl.push(CubePage, {cubeStack: this.cubeStack})
    // this.navCtrl.setRoot(CubePage, {cubeStack: this.cubeStack})
  }

}
