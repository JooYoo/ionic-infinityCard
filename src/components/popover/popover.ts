import { Component } from '@angular/core';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  constructor(public cardService: CardServiceProvider,
    public nav: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

}
