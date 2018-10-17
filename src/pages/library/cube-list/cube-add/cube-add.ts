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
    console.log('----------')


    //TODO: case02: add new item in notEmpty array

    //TODO: case03: reduce item in notEmpty array

  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  dismiss() {
    this.viewControl.dismiss()
  }

}
