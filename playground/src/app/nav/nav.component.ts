import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Nav } from './nav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  fillerNav: Nav[];

  fillerContent = ['Just Contetnt '];

  constructor(changeDetectorRef: ChangeDetectorRef, private router: Router) {

  }

  ngOnDestroy(): void {
  }

  ngOnInit() {
    this.getRoute();
  }

  private getRoute() {
    this.fillerNav = [
      { label: 'Home', route: 'home' },
      { label: 'About Us', route: 'aboutus' },
      { label: 'Contact Us', route: 'contactus' }
    ];
  }
  public navigateRoute(route) {
    console.log(`route`, route)
    this.router.navigate([route]);
  }

}
