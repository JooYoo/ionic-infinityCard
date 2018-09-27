import { Component } from '@angular/core';
import { SettingsPage } from '../settings/settings';
import { StandardPage } from '../standard/standard';
import { LibraryPage } from '../library/library';
import { CubePage } from '../cube/cube';
import { InfinityPage } from '../infinity/infinity';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = StandardPage;
  tab2Root = LibraryPage;
  tab3Root = CubePage;
  tab4Root = InfinityPage;
  tab5Root = SettingsPage;
  constructor() {
  }
}