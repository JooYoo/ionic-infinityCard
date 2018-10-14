import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-cube-edit',
  templateUrl: 'cube-edit.html',
})
export class CubeEditPage {

  cube: any

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController) {
      this.cube = navParams.get("cubeInfo")
        
  }

  dismiss(){
    this.viewControl.dismiss()
  }

  editCube(){
    console.log("editCube function")
  }

}
