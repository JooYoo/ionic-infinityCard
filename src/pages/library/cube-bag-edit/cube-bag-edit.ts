import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CubeBag } from '../../../app/Model/CubeBag';

@Component({
  selector: 'page-cube-bag-edit',
  templateUrl: 'cube-bag-edit.html',
})
export class CubeBagEditPage {

  cubeBag: CubeBag

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController) {

            this.cubeBag = navParams.get('itemInfo')
  }

  dismiss(){
    this.viewControl.dismiss()
  }

  editCubeBag(){
    console.log("clicked editCubeBag()")
  }
 

}
