import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
// import { AgGridModule } from 'ag-grid-angular';
import { NavModule} from './nav/nav.module';

// Firebase Setup
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { RegisterComponent } from './register/register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
    // AboutusComponent,
    // ContactusComponent,
    // RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // MaterialModule, // load this on deamnd with the module so that performance gets increase
    // AgGridModule.withComponents([]),
    NavModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // exports: [MaterialModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
