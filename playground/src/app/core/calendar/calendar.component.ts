import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import * as DateTools from '../tools/date';
import { ICalendarSelection } from './calendar.types';
import { FillPipe} from '../tools/pipes/fill.pipe';

@Component({
  selector: 'wfc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  private _date: any = new Date();
  private _minDate: any = null;
  private _maxDate: any = null;
  private _selectedDate: ICalendarSelection;
  private _preSelectedDate = false;
  private _initialized = false;

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

    if (!this._initialized && value) {
      this._preSelectedDate = this.rangeSelection ? !!(value.date && value.dateTo) : !!value.date;
    }
  }

  @Input()
  mondayFirstDayOfWeek = false;

  @Input()
  rangeSelection = false;

  @Input()
  showNavigationButtons = true;

  @Input()
  showDaysOfWeek = true;

  @Input()
  showOtherMonthDays = true;

  @Input()
  showOtherMonthEmptyWeek = true;

  @Input()
  resetButtonLabel = 'Reset';

  @Input()
  showResetButton = false;

  @Output()
  dateSelected: EventEmitter<Date> = new EventEmitter();

  @Output()
  resetButtonClick: EventEmitter<null> = new EventEmitter();

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.stopPropagation();
  }

  constructor(public elementRef: ElementRef) {
  }

  ngOnInit() {
    this._initialized = true;
  }

  get getCurrentDate(): Date {
    return (this._date as Date);
  }

  get getShowResetButton(): boolean {
    return this.showResetButton && this._preSelectedDate;
  }

  prevClick() {
    this._date = DateTools.addMonths(this.getCurrentDate, -1);
  }

  nextClick() {
    this._date = DateTools.addMonths(this.getCurrentDate, 1);
  }

  addDayFromCurrentDate(index: number): Date {
    return DateTools.addDays(this._dayToStartMonth, index);
  }

  isNotInMonth(index: number): boolean {
    return DateTools.addDays(this._dayToStartMonth, index).getMonth() !== this.getCurrentDate.getMonth();
  }

  isDateDisabled(index: number): boolean {

    const dateToCompare = DateTools.addDays(this._dayToStartMonth, index);

    return this.minDate && dateToCompare < this.minDate || this.maxDate && dateToCompare > this.maxDate;
  }

  className(index: number) {

    if (!this.selectedDate) {
      return null;
    }

    if (this.selectedDate.date && this._isDateFromIndex(index, this.selectedDate.date) ||
      this.selectedDate.dateTo && this._isDateFromIndex(index, this.selectedDate.dateTo)) {
      return 'selected';
    }

    if (this.selectedDate.date && this.selectedDate.dateTo && this._isDateBetweenFromIndex(index)) {
      return 'between';
    }
  }

  lengthOfMonth(): number {

    if (!this.showOtherMonthEmptyWeek) {
      return DateTools.addDays(this._dayToStartMonth, 35).getMonth() === this.getCurrentDate.getMonth() ? 42 : 35;
    }

    return 42;
  }

  handleDayClick(date: Date) {
    this.dateSelected.emit(date);
  }

  handleResetButtonClick(event: MouseEvent) {
    event.preventDefault();
    this.resetButtonClick.emit();
  }

  isPrevButtonDisabled() {

    if (this.minDate) {
      return DateTools.getFirstDayOfMonth(DateTools.addMonths(this.getCurrentDate, -1)) < DateTools.getFirstDayOfMonth(this.minDate);
    }

    return false;
  }

  isNextButtonDisabled() {

    if (this.maxDate) {
      return DateTools.getFirstDayOfMonth(this.getCurrentDate) >= DateTools.getFirstDayOfMonth(this.maxDate);
    }

    return false;
  }

  private get _dayToStartMonth(): Date {
    return DateTools.dayToStartMonth(this.getCurrentDate, this.mondayFirstDayOfWeek);
  }

  private _isDateFromIndex(index: number, dateToCompare: Date): boolean {
    return DateTools.removeTime(this.addDayFromCurrentDate(index)).getTime() === DateTools.removeTime(dateToCompare).getTime();
  }

  private _isDateBetweenFromIndex(index: number): boolean {
    const date = DateTools.removeTime(this.addDayFromCurrentDate(index));
    return date >= this.selectedDate.date && date <= this.selectedDate.dateTo;
  }
}
