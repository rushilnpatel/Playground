import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModule } from './material.module';
import { AgGridModule } from 'ag-grid-angular';

// Firebase Setup
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  exports: [MaterialModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
