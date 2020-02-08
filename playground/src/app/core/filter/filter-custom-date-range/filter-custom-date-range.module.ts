import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCustomDateRangeComponent } from './filter-custom-date-range.component';
import { DatePickerModule } from '../../date-picker/date-picker.module';
import { RadioButtonModule } from '../../radio-button/radio-button.module';

@NgModule({
  declarations: [FilterCustomDateRangeComponent],
  imports: [
    CommonModule,
    DatePickerModule,
    RadioButtonModule
  ],
  exports: [FilterCustomDateRangeComponent],
  entryComponents: [FilterCustomDateRangeComponent]
})
export class FilterCustomDateRangeModule {
}
