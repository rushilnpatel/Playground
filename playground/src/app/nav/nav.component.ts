import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Nav } from './nav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  fillerNav: Nav[];

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
