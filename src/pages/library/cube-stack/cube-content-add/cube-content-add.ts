import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../../providers/card-service/card-service';

@Component({
  selector: 'page-cube-content-add',
  templateUrl: 'cube-content-add.html',
})
export class CubeContentAddPage {

  cubeBag: any
  //sideLength: number = 3
  //isEmptyArray: boolean = false;
  //sides: string[]

  id: number
  date: string = new Date().toISOString()
  cubeTitleCn: string
  cubeTitleDe: string
  cubeTexts: string[] = []


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewControl: ViewController,
    public cardService: CardServiceProvider) {

    this.cubeBag = navParams.get("cubeBagInfo")

    //this.sides = new Array(this.sideLength)
  }

  addCube() {
    this.cardService.addCube(this.cubeBag,this.cubeTitleCn,this.cubeTitleDe, this.cubeTexts)
  }

  

  // onRangeChange() {
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
  //   else if (this.sideLength > this.sides.length) { // FIXME: case 02: ArrayItem++
  //     this.sides.push(null);
  //   }
  //   else if (this.sideLength < this.sides.length) { // FIXME: case 03: ArrayItem--
  //     this.sides.pop()
  //   }
  // }
  // trackByIndex(index: number, obj: any): any {
  //   return index;
  // }

  dismiss() {
    this.viewControl.dismiss()
  }

}
