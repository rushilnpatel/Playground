import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { IconModule } from '../icon/icon.module';
import { FilterSectionComponent } from './filter-section.component';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { PortalModule } from '../configuration/portal/portal.module';
import { FilterCustomDirective } from './filter-custom-new/filter-custom.directive';
import { FilterCustomNewComponent } from './filter-custom-new/filter-custom-new.component';

@NgModule({
  declarations: [FilterComponent, FilterSectionComponent, FilterCustomDirective, FilterCustomNewComponent],
  imports: [
    CommonModule,
    IconModule,
    CheckboxModule,
    DatePickerModule,
    PortalModule
  ],
  exports: [FilterComponent, FilterCustomDirective, FilterCustomNewComponent],
  entryComponents: [FilterCustomNewComponent]
})
export class FilterModule { }
