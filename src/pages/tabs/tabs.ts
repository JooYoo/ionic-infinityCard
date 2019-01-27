import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';
import { LibraryPage } from '../library/library';
import { CubePage } from '../cube/cube';
import { InfinityPage } from '../infinity/infinity';
import { SwipePage } from '../swipe/swipe';
import { ChartPage } from '../chart/chart';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = SwipePage;
  tab2Root = LibraryPage;
  tab3Root = CubePage;
  tab4Root = InfinityPage;
  tab5Root = SettingsPage;
  tab6Root = ChartPage
    constructor() {
  }
}