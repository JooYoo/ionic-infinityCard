import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../../providers/card-service/card-service';

@Component({
  selector: 'page-cube-content-edit',
  templateUrl: 'cube-content-edit.html',
})
export class CubeContentEditPage {

  // isEmptyArray: boolean = false
  // sideLength: number
  
  cube: any
  cubeStack: any
  cubeSide1:string
  cubeSide2:string
  cubeSide3:string
  cubeSide4:string

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController,
              public cardService: CardServiceProvider) {
      this.cube = navParams.get("cubeInfo")
      this.cubeStack= navParams.get("cubeStackInfo")

      this.cubeSide1 = this.cube.cubeSide1
      this.cubeSide2 = this.cube.cubeSide2
      this.cubeSide3 = this.cube.cubeSide3
      this.cubeSide4 = this.cube.cubeSide4
  }

  editCube(){
    this.cardService.editCube(this.cube, this.cubeSide1, this.cubeSide2, this.cubeSide3, this.cubeSide4)
  }
  removeCube(){
    this.cardService.removeCube(this.cube, this.cubeStack)
  }

  dismiss(){
    this.viewControl.dismiss()
  }

  // onRangeChange(){
  //   // set isEmpty string boolean value
  //   for (let i = 0; i < this.sides.length; i++) {
  //     if (this.sides[i] == undefined) {
  //       this.isEmptyArray = true
  //     }
  //     else {
  //       this.isEmptyArray = false
  //     }
  //   }

  //   if (this.isEmptyArray) { // FIXME: case 01: Empty Array 
  //     this.sides = new Array(this.sideLength)
  //   }
  //   else if(this.sideLength > this.sides.length) { // FIXME: case 02: ArrayItem++
  //     this.sides.push(null);
  //   }
  //   else if(this.sideLength < this.sides.length){ // FIXME: case 03: ArrayItem--
  //     this.sides.pop()
  //   }
  // }
  // trackByIndex(index: number, obj: any): any {
  //   return index;
  // }
}
