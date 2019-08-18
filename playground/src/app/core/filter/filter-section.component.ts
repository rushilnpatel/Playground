import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PortalHostDirective } from '../configuration/portal/portal.directive';
import { ComponentPortal } from '../configuration/portal/portal';
import { ICalendarSelection } from '../calendar/calendar.types';
import { ICheckbox } from '../checkbox/checkbox.types';
import { IFilterDataGroup, IFilterDateSelection } from './filter.types';
import * as ObjectTools from '../tools/object';
import { FilterCustomNewComponent } from './filter-custom-new/filter-custom-new.component';
import { Subject, Subscription } from 'rxjs';
import { IKeyValueLabel } from '../models/data.types';

@Component({
  selector: '[wfc-filter-section]',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSectionComponent implements AfterViewInit, OnDestroy {

  private _subscription: Subscription[] = [];

  /** The portal host inside of this container into which the custom filter will be loaded. */
  @ViewChild(PortalHostDirective, {static: false})
  portalHost: PortalHostDirective;

  @ViewChild('filterContent', { read: ViewContainerRef, static: false })
  filterContent: ViewContainerRef;

  @Input()
  label = '';

  @Input()
  key = '';

  @Input()
  items: any[] = [];

  @Input()
  group: IFilterDataGroup;

  @Input()
  showAll = false;

  @Input()
  showAllExpanded = false;

  @Input()
  customComponentContent: FilterCustomNewComponent;

  @Output()
  checkboxChange: EventEmitter<ICheckbox> = new EventEmitter();

  @Output()
  customFilterChange: EventEmitter<any> = new EventEmitter();

  @Output()
  dateChange: EventEmitter<IFilterDateSelection> = new EventEmitter();

  @Output()
  showAllClick: EventEmitter<string> = new EventEmitter();

  /** Only for internal user */
  @Output()
  customComponentInstantiated: EventEmitter<any> = new EventEmitter();

  /** Only for internal user */
  @Output()
  customFilterAdded: EventEmitter<IKeyValueLabel> = new EventEmitter();

  /** Only for internal user */
  @Output()
  customFilterRemoved: EventEmitter<IKeyValueLabel> = new EventEmitter();

  ngAfterViewInit() {
    if (this.customComponentContent && this.portalHost && !this.portalHost.hasAttached()) {

      let customCellComponentRef: ComponentRef<FilterCustomNewComponent>;

      try {
        customCellComponentRef = this.portalHost.attachComponentPortal(new ComponentPortal(this.customComponentContent.getInstanceOf(), this.filterContent));
      } catch (e) {
        throw new Error(`The custom filter component needs to have defined the function getInstanceOf() that returns the ComponentType.
        
        Example of filter-custom-date-range:
        
        getInstanceOf(): ComponentType<any> {
          return FilterCustomDateRange;
        }`);
      }

      if (!ObjectTools.isFunction(customCellComponentRef.instance['filterData'])) {
        throw new Error(`The custom cell component needs to have defined the function filterData(rows: any[], queryStringParameters?: any[]) that returns the filtered rows.`);
      }

      customCellComponentRef.instance.filterDataGroup = this.group;

      // Send the instance of the custom component to the parent Filter component
      this.customComponentInstantiated.emit({
        id: this.customComponentContent.id,
        instance: customCellComponentRef.instance
      });

      this._subscription = [...this._subscription, customCellComponentRef.instance.filterChange
        .asObservable()
        .subscribe(() => this.customFilterChange.emit())];

      this._subscription = [...this._subscription, customCellComponentRef.instance.customFilterAdded
        .asObservable()
        .subscribe((filter: IKeyValueLabel) => this.customFilterAdded.emit(filter))];

      this._subscription = [...this._subscription, customCellComponentRef.instance.customFilterRemoved
        .asObservable()
        .subscribe((filter: IKeyValueLabel) => this.customFilterRemoved.emit(filter))];
    }
  }

  ngOnDestroy() {
    this._subscription.map(sub => sub.unsubscribe());
  }

  handleCheckboxChange(event: ICheckbox) {
    this.checkboxChange.emit(event);
  }

  handleDateChange(event: ICalendarSelection, key: string, label: string, dateFormat: string, rangeSelection: boolean) {
    this.dateChange.emit({
      calendarSelection: event,
      key,
      label,
      dateFormat,
      rangeSelection
    });
  }

  handleShowAllClick(event: MouseEvent, key: string) {
    event.preventDefault();
    this.showAllClick.emit(key);
  }
}
