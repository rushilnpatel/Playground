import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalHostDirective, TemplatePortalDirective } from './portal.directive';

@NgModule({
  declarations: [TemplatePortalDirective, PortalHostDirective],
  imports: [
    CommonModule
  ],
  exports: [TemplatePortalDirective, PortalHostDirective]
})
export class PortalModule { }
