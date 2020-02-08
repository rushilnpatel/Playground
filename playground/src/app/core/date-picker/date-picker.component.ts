import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { WindowResizeService } from '../tools/window/window-resize.service';
import { Subscription } from 'rxjs';
import { PortalService } from '../configuration/portal/portal.service';
import { ComponentPortal } from '../configuration/portal/portal';
import { CalendarComponent } from '../calendar/calendar.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { OverlayService } from '../overlay/overlay.service';
import { DOCUMENT } from '@angular/common';
import { CalendarStreamComponent } from '../calendar/calendar-stream.component';
import * as DateTools from '../tools/date';
import { ICalendarSelection } from '../calendar/calendar.types';
import { FormatDataService } from '../tools/format/format-data.service';
import { TableDataType } from '../table/table.types';

@Component({
  selector: 'wfc-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit, OnDestroy {

  private _windowResizeServiceSub: Subscription;
  private _open = false;
  private _portal: ComponentRef<CalendarComponent> | ComponentRef<CalendarStreamComponent>;
  private _overlayRef: OverlayComponent;
  private _subscription: Subscription[] = [];

  private _minDate: any;
  private _maxDate: any;
  private _selectedDate: ICalendarSelection;

  isSmallView = false;

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
  get selectedDate() {
    return this._selectedDate;
  }

  set selectedDate(value: ICalendarSelection) {
    this._selectedDate = value;
    this._changeDetectorRef.markForCheck();
  }

  @Input()
  dateFormat = 'dd MMM yyyy';

  @Input()
  rangeSelection = false;

  @Input()
  autoClose = true;

  @Input()
  mondayFirstDayOfWeek = false;

  @Input()
  selectDateButtonLabel = this.rangeSelection ? 'Select Dates' : 'Select Date';

  @Input()
  resetButtonLabel = 'Reset';

  @Input()
  showResetButton = true;

  @Output()
  dateSelected: EventEmitter<ICalendarSelection> = new EventEmitter();

  constructor(private _windowResizeService: WindowResizeService,
              private _changeDetectorRef: ChangeDetectorRef,
              private _overlayService: OverlayService,
              private _portalService: PortalService,
              private _renderer: Renderer2,
              private _elementRef: ElementRef,
              private _formatDataService: FormatDataService,
              @Inject(DOCUMENT) private _document: Document) {
  }

  ngOnInit() {

    this.isSmallView = this._windowResizeService.getBreakpoint < 1;

    this._windowResizeServiceSub = this._windowResizeService.windowResize().subscribe(breakpoint => {

      const fitBreakPoint = breakpoint < 1;

      if (fitBreakPoint !== this.isSmallView) {
        this.isSmallView = fitBreakPoint;
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  ngOnDestroy() {
    if (this._windowResizeServiceSub) {
      this._windowResizeServiceSub.unsubscribe();
    }
  }

  open() {
    this._open = true;
    this._createAndShowCalendar();
  }

  close() {
    this._open = false;
    this._cleanUp();
  }

  reset() {
    this.selectedDate = null;
  }

  handleDateFromClick() {
    this._createAndShowCalendar();
  }

  handleDateToClick() {
    this._createAndShowCalendar();
  }

  getFormattedSelectedDate() {

    if (!this.selectedDate || !this.selectedDate.date) {
      return '';
    }

    if (this.rangeSelection) {

      if (!this.selectedDate.dateTo) {
        return '';
      }

      return `${this._formatDataService.transform(TableDataType.DATE, this.dateFormat, this.selectedDate.date)} - ${this._formatDataService.transform(TableDataType.DATE, this.dateFormat, this.selectedDate.dateTo)}`;
    }

    return this._formatDataService.transform(TableDataType.DATE, this.dateFormat, this.selectedDate.date);
  }

  private _createAndShowCalendar() {

    this._open = true;

    if (this.isSmallView) {
      this._createAndShowStreamCalendar();
    } else {
      this._createAndShowRegularCalendar();
    }
  }

  private _createAndShowStreamCalendar() {

    this._portal = this._portalService.attachComponentPortal(new ComponentPortal(CalendarStreamComponent, this._portalService.viewContainerRef));

    const calendarStreamInstance = this._portal.instance;
    calendarStreamInstance.mondayFirstDayOfWeek = this.mondayFirstDayOfWeek;
    calendarStreamInstance.selectedDate = this.selectedDate;
    calendarStreamInstance.rangeSelection = this.rangeSelection;
    calendarStreamInstance.minDate = this.minDate;
    calendarStreamInstance.maxDate = this.maxDate;
    calendarStreamInstance.selectDateButtonLabel = this.selectDateButtonLabel;
    calendarStreamInstance.resetButtonLabel = this.resetButtonLabel;

    if (this.selectedDate && this.showResetButton) {
      calendarStreamInstance.showResetButton = true;
    }

    this._subscription = [...this._subscription, calendarStreamInstance.selectDateButtonClick.subscribe(selectedDate => {
      this.selectedDate = selectedDate;
      this._changeDetectorRef.markForCheck();
      this.close();
      this.dateSelected.emit(this.selectedDate);
    })];


    this._subscription = [...this._subscription, calendarStreamInstance.resetButtonClick.subscribe(() => {
      this.selectedDate = null;
      this._changeDetectorRef.markForCheck();
      this.close();
      this.dateSelected.emit(null);
    })];

    this._subscription = [...this._subscription, calendarStreamInstance.close.subscribe(() => this.close())];
  }

  private _createAndShowRegularCalendar() {

    this._overlayRef = this._overlayService.createOverlay(true);
    this._portal = this._overlayRef.portalHost.attachComponentPortal(new ComponentPortal(CalendarComponent, null));

    const calendarInstance = this._portal.instance;
    calendarInstance.mondayFirstDayOfWeek = this.mondayFirstDayOfWeek;
    calendarInstance.selectedDate = this.selectedDate;
    calendarInstance.rangeSelection = this.rangeSelection;
    calendarInstance.minDate = this.minDate;
    calendarInstance.maxDate = this.maxDate;
    calendarInstance.resetButtonLabel = this.resetButtonLabel;
    calendarInstance.showResetButton = this.selectedDate && this.showResetButton;

    const clientRect = this._elementRef.nativeElement.getBoundingClientRect();

    const top = this._document.body.scrollTop + clientRect.bottom;

    this._renderer.addClass(calendarInstance.elementRef.nativeElement, 'date-picker');
    this._renderer.setStyle(calendarInstance.elementRef.nativeElement, 'top', `${top}px`);
    this._renderer.setStyle(calendarInstance.elementRef.nativeElement, 'left', `${clientRect.left}px`);

    this._subscription = [...this._subscription, this._overlayRef.overlayMouseClick().subscribe(() => this.close())];

    // In the case that there's a selection we show the selected month first
    if (this.selectedDate && this.selectedDate.date) {
      calendarInstance.date = this.selectedDate.date;
    } else if (this.minDate && this.maxDate) { // We split the difference and we show to the user the month that is in the middle of the range
      calendarInstance.date = DateTools.addMonths(this.minDate, Math.ceil(DateTools.monthDiff(this.minDate, this.maxDate) / 2));
    }

    this._subscription = [...this._subscription, calendarInstance.dateSelected.subscribe(date => {

      if (this.rangeSelection) {
        // Select the DateFrom
        if (!this.selectedDate || !this.selectedDate.date || (this.selectedDate.date && this.selectedDate.dateTo) || date.getTime() === this.selectedDate.date.getTime()) {

          this.selectedDate = {
            date,
            dateTo: null
          };

        } else if (date < this.selectedDate.date) { // DateTo is before DateFrom, so we switch the values

          this.selectedDate = {
            dateTo: this.selectedDate.date,
            date
          };

        } else {
          // Select the DateTo
          this.selectedDate = { ...this.selectedDate, dateTo: date };
        }

        if (this.autoClose && (this.selectedDate.date && this.selectedDate.dateTo)) {
          setTimeout(() => {
            this.close();
          }, 250);
        }

      } else {

        this.selectedDate = {
          date,
          dateTo: null
        };

        if (this.autoClose) {
          setTimeout(() => {
            this.close();
          }, 250);
        }
      }

      this._changeDetectorRef.markForCheck();
      calendarInstance.selectedDate = this.selectedDate;

      if (this.rangeSelection) {
        if (this.selectedDate && this.selectedDate.dateTo) {
          this.dateSelected.emit(this.selectedDate);
        }
      } else {
        if (this.selectedDate && this.selectedDate.date) {
          this.dateSelected.emit(this.selectedDate);
        }
      }
    })];

    this._subscription = [...this._subscription, calendarInstance.resetButtonClick.subscribe(() => {
      this.selectedDate = null;
      this._changeDetectorRef.markForCheck();
      this.close();
      this.dateSelected.emit(null);
    })];
  }

  private _cleanUp() {

    if (this._portal) {
      this._portal.destroy();
    }

    if (this._overlayRef) {
      this._overlayService.disposeOverlay(this._overlayRef);
    }

    this._subscription.map(sub => sub.unsubscribe());
  }
}
