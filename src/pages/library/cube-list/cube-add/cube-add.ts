import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-cube-add',
  templateUrl: 'cube-add.html',
})
export class CubeAddPage {

  cubeBag: any

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController) {
      this.cubeBag = navParams.get("cubeBagInfo")
  }


  dismiss(){
    this.viewControl.dismiss()
  }

  addCube(){
    console.log("addCube function")
  }


}
