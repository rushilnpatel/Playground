import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker.component';
import { CalendarModule } from '../calendar/calendar.module';
import { OverlayModule } from '../overlay/overlay.module';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [
    CommonModule,
    CalendarModule,
    OverlayModule
  ],
  exports: [DatePickerComponent]
})
export class DatePickerModule { }
