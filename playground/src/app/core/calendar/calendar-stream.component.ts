import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList, ViewChild, ViewChildren
} from '@angular/core';
import * as DateTools from '../tools/date';
import { CalendarComponent } from './calendar.component';
import { ICalendarSelection } from './calendar.types';

@Component({
  selector: 'wfc-calendar-stream',
  templateUrl: './calendar-stream.component.html',
  styleUrls: ['./calendar-stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarStreamComponent implements AfterViewInit {

  private _date: any = new Date();
  private _minDate: any;
  private _maxDate: any;
  private _selectedDate: ICalendarSelection;
  private _preSelectedDate = false;
  private _initialized = false;

  @ViewChild('header', {static: false})
  header: ElementRef;

  @ViewChild('content', {static: false})
  content: ElementRef;

  @ViewChildren(CalendarComponent)
  calendarItems: QueryList<CalendarComponent>;

  @Input()
  get date() {
    return this._date;
  }

  set date(value: any) {

    if (typeof value !== 'object') {
      this._date = DateTools.getFirstDayOfMonth((new Date(value)));
      return;
    }

    this._date = DateTools.getFirstDayOfMonth(value as Date);
  }

  @Input()
  get minDate() {
    return this._minDate;
  }

  set minDate(value: any) {
    this._minDate = DateTools.convertToDate(value);
  }

  @Input()
  get maxDate() {
    return this._maxDate;
  }

  set maxDate(value: any) {
    this._maxDate = DateTools.convertToDate(value);
  }

  @Input()
  get selectedDate(): ICalendarSelection {
    return this._selectedDate;
  }

  set selectedDate(value: ICalendarSelection) {
    this._selectedDate = value;

    if (!this._initialized && value && value.date && value.dateTo) {
      this._preSelectedDate = true;
    }
  }

  @Input()
  mondayFirstDayOfWeek = false;

  @Input()
  rangeSelection = false;

  @Input()
  selectDateButtonLabel = this.rangeSelection ? 'Select Dates' : 'Select Date';

  @Input()
  resetButtonLabel = 'Reset';

  @Input()
  showResetButton = false;

  @Output()
  dateSelected: EventEmitter<ICalendarSelection> = new EventEmitter();

  @Output()
  selectDateButtonClick: EventEmitter<ICalendarSelection> = new EventEmitter();

  @Output()
  resetButtonClick: EventEmitter<null> = new EventEmitter();

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit() {

    this._initialized = true;

    // In the case that there's a selection we show the selected month first
    if (this.selectedDate && this.selectedDate.date) {
      const selectedDate = DateTools.getFirstDayOfMonth(this.selectedDate.date);
      const calendarComponent = this.calendarItems.find(calendar => (calendar.date >= selectedDate) && calendar.date <= selectedDate);

      if (!calendarComponent) {
        return;
      }

      this.content.nativeElement.scrollTo(0, calendarComponent.elementRef.nativeElement.offsetTop - this.header.nativeElement.clientHeight);

    } else { // We split the difference and we show to the user the month that is in the middle of the range
      this.content.nativeElement.scrollTo(0, this.calendarItems.toArray()[Math.ceil(this.calendarItems.length / 2)].elementRef.nativeElement.offsetTop - this.header.nativeElement.clientHeight);
    }
  }

  get getCurrentDate(): Date {

    if (this.minDate) {
      return (this.minDate as Date);
    }

    return (this._date as Date);
  }

  get getShowResetButton(): boolean {
    return this.showResetButton && this._preSelectedDate;
  }

  handleCloseClick() {
    this.close.emit();
  }

  addDayFromCurrentDate(index: number): Date {
    return DateTools.addDays(this._dayToStartMonth, index);
  }

  addMonthFromCurrentDate(index: number): Date {
    return DateTools.addMonths(this.getCurrentDate, index);
  }

  getAmountOfMonths(): number {

    if (!this._minDate || !this._maxDate) {
      return 12;
    }

    return DateTools.monthDiff(this._minDate, this._maxDate);
  }

  handleDateSelected(event: Date) {

    // As we are not using range, we just select one date
    if (!this.rangeSelection) {
      this.selectedDate = {
        date: event,
        dateTo: null
      };

      return;
    }

    // Select the DateFrom
    if (!this.selectedDate || !this.selectedDate.date || (this.selectedDate.date && this.selectedDate.dateTo) || event.getTime() === this.selectedDate.date.getTime()) {
      this.selectedDate = {
        date: event,
        dateTo: null
      };

      return;
    }

    // DateTo is before DateFrom, so we switch the values
    if (event < this.selectedDate.date) {
      this.selectedDate = {
        dateTo: this.selectedDate.date,
        date: event
      };

      return;
    }

    // Select the DateTo
    this.selectedDate = { ...this.selectedDate, dateTo: event };

    this.dateSelected.emit(this.selectedDate);
  }

  handleSelectDateButtonClick() {
    this.selectDateButtonClick.emit(this.selectedDate);
  }

  handleResetButtonClick() {
    this.resetButtonClick.emit();
  }

  private get _dayToStartMonth(): Date {
    return DateTools.dayToStartMonth(this.getCurrentDate, this.mondayFirstDayOfWeek);
  }
}
