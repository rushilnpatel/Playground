import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { MaterialModule } from '../material.module';
import { NavRoutingModule } from './nav.routing.module';
import { HomeComponent } from '../home/home.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { ContactusComponent } from '../contactus/contactus.component';
import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavComponent,
    HomeComponent,
    AboutusComponent,
    ContactusComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    NavRoutingModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
