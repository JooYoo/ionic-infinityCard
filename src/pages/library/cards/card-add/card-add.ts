import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-card-add',
  templateUrl: 'card-add.html',
})
export class CardAddPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewControl: ViewController) {
  }

  dismiss(){
    this.viewControl.dismiss()
  }

  
}