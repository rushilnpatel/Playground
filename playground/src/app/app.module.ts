import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';
import { SideNavModule } from './side-nav/side-nav.module';

// Firebase Setup
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
<<<<<<< HEAD
    MaterialModule,
    AgGridModule.withComponents([]),
    AngularFireModule.initializeApp(environment.firebaseConfig)
=======
    // MaterialModule, // load this on deamnd with the module so that performance gets increase
    AgGridModule.withComponents([]),
    SideNavModule
>>>>>>> release/1.0
  ],
  providers: [],
  exports: [MaterialModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
