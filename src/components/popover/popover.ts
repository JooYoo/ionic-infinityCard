import { Component } from '@angular/core';
import { CardServiceProvider } from '../../providers/card-service/card-service';
import { NavController, NavParams } from 'ionic-angular';
import { LibraryPage } from '../../pages/library/library';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  cardBag: any
 

  constructor(public cardService: CardServiceProvider,
    public nav: NavController,
    public navParams: NavParams) {

      this.cardBag = navParams.get('cardBagInfo')
      console.log(this.cardBag)
  }

  removeCardBag() {
    this.cardService.removeCardBag(this.cardBag)
    this.nav.push(LibraryPage)
  }

}
