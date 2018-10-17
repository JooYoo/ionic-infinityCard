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
  sides:string[]

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController,
              public cardService: CardServiceProvider) {
      this.cubeBag = navParams.get("cubeBagInfo")
      this.sides = new Array(this.sideLength)
  }

  addCube(){
    this.cardService.addCube(this.cubeBag, this.sides)
  }

  onRangeChange(){
    console.log(this.sideLength)
    this.sides = new Array(this.sideLength)
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  dismiss(){
    this.viewControl.dismiss()
  }

}
