import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { MaterialModule } from '../material.module';
import { NavRoutingModule } from './nav.routing.module';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NavRoutingModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
