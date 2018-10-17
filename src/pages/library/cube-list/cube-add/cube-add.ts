import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CardServiceProvider } from '../../../../providers/card-service/card-service';

@Component({
  selector: 'page-cube-add',
  templateUrl: 'cube-add.html',
})
export class CubeAddPage {

  cubeBag: any
  sideLength: number = 3
  sides: string[]

  isEmptyArray: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewControl: ViewController,
    public cardService: CardServiceProvider) {
    this.cubeBag = navParams.get("cubeBagInfo")
    this.sides = new Array(this.sideLength)
  }

  addCube() {
    this.cardService.addCube(this.cubeBag, this.sides)
  }

  onRangeChange() {

    //TODO: case01: empty array
    this.sides.forEach(side => {
      console.log(this.isEmptyArray)

      if (side == undefined) {
        this.isEmptyArray = true
        console.log(this.isEmptyArray)
      }
      this.isEmptyArray = false
    });

    if (this.isEmptyArray) {
      this.sides = new Array(this.sideLength)

    }

    //TODO: case02: add new item in notEmpty array

    //TODO: case03: reduce item in notEmpty array


    console.log(this.sides)
    console.log(this.sides[0])
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  dismiss() {
    this.viewControl.dismiss()
  }

}
