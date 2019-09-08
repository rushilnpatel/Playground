import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SideNav } from './sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  fillerNav: SideNav[];

  fillerContent = ['Just Contetnt '];

  constructor(changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getRoute();
  }

  private getRoute() {
    this.fillerNav = [
      { label: 'Home', route: 'Home' },
      { label: 'About Us', route: 'About US' },
      { label: 'Contact Us', route: 'Contact Us' }
    ];
  }
}
