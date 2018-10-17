import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../../providers/card-service/card-service';

@Component({
  selector: 'page-cube-edit',
  templateUrl: 'cube-edit.html',
})
export class CubeEditPage {

  cube: any
  isEmptyArray: boolean = false

  sideLength: number
  sides:string[]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController,
              public cardService: CardServiceProvider) {
      this.cube = navParams.get("cubeInfo")
      this.sideLength = this.cube.cubeTexts.length
      this.sides = this.cube.cubeTexts
        
  }

  editCube(){
    console.log("editCube function")
    this.cardService.editCube(this.cube, this.sides)
  }

  dismiss(){
    this.viewControl.dismiss()
  }

  onRangeChange(){
    
    for (let i = 0; i < this.sides.length; i++) {

      if (this.sides[i] == undefined) {
        this.isEmptyArray = true
      }
      else {
        this.isEmptyArray = false
      }
    }
    
    if (this.isEmptyArray) {
      this.sides = new Array(this.sideLength)
    }
    else {
      this.sides.push(null);
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
