import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { IconModule } from '../icon/icon.module';
import { PipesModule } from '../tools/pipes/pipes.module';
import { CalendarStreamComponent } from './calendar-stream.component';

@NgModule({
  declarations: [CalendarComponent, CalendarStreamComponent],
  imports: [
    CommonModule,
    IconModule,
    PipesModule
  ],
  exports: [CalendarComponent, CalendarStreamComponent],
  entryComponents: [CalendarComponent, CalendarStreamComponent]
})
export class CalendarModule { }
