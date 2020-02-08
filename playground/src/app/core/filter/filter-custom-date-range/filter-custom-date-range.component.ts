import { ChangeDetectionStrategy, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FilterCustomNewComponent } from '../filter-custom-new/filter-custom-new.component';
import { IRadioButton } from '../../radio-button/radio-button.types';
import { RadioButtonComponent } from '../../radio-button/radio-button.component';
import { DatePickerComponent } from '../../date-picker/date-picker.component';
import { IKeyValue, IKeyValueLabel } from '../../models/data.types';
import * as DateTools from '../../tools/date';
import {ComponentType} from '../../configuration/portal/portal.types';

@Component({
  selector: 'wfc-filter-custom-date-range',
  templateUrl: './filter-custom-date-range.component.html',
  styleUrls: ['./filter-custom-date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterCustomDateRangeComponent extends FilterCustomNewComponent {

  private _lastChecked;
  private _queryStringCustomFiltersAdded = false;

  @ViewChildren(RadioButtonComponent)
  radioButtons: QueryList<RadioButtonComponent>;

  @ViewChild(DatePickerComponent, {static: false})
  dateRangeDatePicker: DatePickerComponent;

  constructor() {
    super();
  }

  getInstanceOf(): ComponentType<any> {
    return FilterCustomDateRangeComponent;
  }

  /**
   * This function is in charge of filtering the rows based on the state of the custom filter
   */
  filterData(rows: any[], queryStringParameters?: any[]): any[] {

    this._addQueryStringCustomFilters(queryStringParameters);

    if (!this.radioButtons || this.radioButtons.toArray().every(radio => !radio.checked)) {
      return rows;
    }

    const filterValue = this.radioButtons.find(radioButton => radioButton.checked).value;

    if (filterValue === 'customRange') {

      if (this.dateRangeDatePicker.selectedDate && this.dateRangeDatePicker.selectedDate.date && this.dateRangeDatePicker.selectedDate.dateTo) {
        return rows.filter(row => {
          const rowDate = DateTools.convertToDate(row[this.filterDataGroup.key]);
          return rowDate >= this.dateRangeDatePicker.selectedDate.date && rowDate < this.dateRangeDatePicker.selectedDate.dateTo;
        });
      }

      return rows;

    } else {

      const dateTo = DateTools.addDays(new Date(), parseInt(filterValue, 10) * -1);

      return rows.filter(row => {
        const rowDate = DateTools.convertToDate(row[this.filterDataGroup.key]);
        return rowDate >= dateTo;
      });
    }
  }

  /**
   * This function is in charge remove the state of checked when the user remove a chiclet
   */
  removeFilter(filter: IKeyValueLabel) {

    const radio = this.radioButtons.find(radioButton => radioButton.value === filter.key.replace(this.filterDataGroup.customComponentId, ''));

    if (radio) {
      radio.checked = false;
    }
  }

  /**
   * This function is in charge of clear all the filters when the user click on clear all filters.
   */
  removeAllFilters() {
    this.radioButtons.map(radioButton => radioButton.checked = false);
    this._lastChecked = null;
  }

  handleRadioButtonChange(event: IRadioButton) {

    const { value } = event;
    const baseFilter = {
      key: `${this.filterDataGroup.customComponentId}${value}`,
      label: this.filterDataGroup.label
    };

    // Clear all the option buttons if the user click on a checked option button (toggle)
    if (value === this._lastChecked) {
      this.radioButtons.map(radioButton => radioButton.checked = false);
      this._lastChecked = null;
      this._removeUncheckedFilters();
      this.filterChange.emit();
      return;
    }

    this._removeUncheckedFilters();

    if (value !== 'customRange') {
      this.customFilterAdded.emit({
        ...baseFilter,
        value
      });
    } else if (this.dateRangeDatePicker.selectedDate && this.dateRangeDatePicker.selectedDate.date && this.dateRangeDatePicker.selectedDate.dateTo) {
      this.customFilterAdded.emit({
        ...baseFilter,
        value: this.dateRangeDatePicker.getFormattedSelectedDate()
      });
    }

    this._lastChecked = value;
    this.filterChange.emit();
  }

  handleDateSelected() {

    const formattedSelectedDate = this.dateRangeDatePicker.getFormattedSelectedDate();

    // The user reset the date from the calendar component
    if (!formattedSelectedDate) {
      this.customFilterRemoved.emit({
        key: `${this.filterDataGroup.customComponentId}customRange`,
        label: null,
        value: null
      });
      return;
    }

    const filter = {
      key: `${this.filterDataGroup.customComponentId}customRange`,
      label: this.filterDataGroup.label,
      value: formattedSelectedDate
    };

    this.customFilterRemoved.emit({
      key: `${this.filterDataGroup.customComponentId}customRange`,
      label: null,
      value: null
    });

    if (formattedSelectedDate && this.radioButtons.find(radioButton => radioButton.value === 'customRange').checked) {
      this.customFilterAdded.emit(filter);
    }
  }

  private _removeUncheckedFilters() {
    this.radioButtons.filter(radioButton => !radioButton.checked).map(radioButton => {
      this.customFilterRemoved.emit({
        key: `${this.filterDataGroup.customComponentId}${radioButton.value}`,
        label: null,
        value: null
      });
    });
  }

  private _addQueryStringCustomFilters(queryStringFilters: IKeyValue[]) {

    if (this._queryStringCustomFiltersAdded || !this.radioButtons || !queryStringFilters.length) {
      return;
    }

    const filter: IKeyValue = queryStringFilters.find(f => f.key === this.filterDataGroup.key);

    if (!filter) {
      return;
    }

    const radio = this.radioButtons.find(radioButton => radioButton.value === filter.value);

    if (!radio) {
      return;
    }

    radio.checked = true;

    this.customFilterAdded.emit({
      key: `${this.filterDataGroup.customComponentId}${radio.value}`,
      label: this.filterDataGroup.label,
      value: radio.value
    });

    this._queryStringCustomFiltersAdded = true;
  }
}
