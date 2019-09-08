import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';
import { SideNavModule } from './side-nav/side-nav.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MaterialModule, // load this on deamnd with the module so that performance gets increase
    AgGridModule.withComponents([]),
    SideNavModule
  ],
  providers: [],
  exports: [MaterialModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
