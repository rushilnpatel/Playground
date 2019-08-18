import { AfterContentInit, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IFilterKeyValueLabel, IKeyValue, IKeyValueLabel } from '../models/data.types';
import { Observable, Subject, Subscription } from 'rxjs';
import * as ArrayTools from '../tools/array';
import { auditTime, debounceTime, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import * as DateTools from '../tools/date';
import { ICheckbox } from '../checkbox/checkbox.types';
import { FilterDataType, IFilterChangeEvent, IFilterConfig, IFilterData, IFilterDataGroup, IFilterDateSelection } from './filter.types';
import { TableDataType } from '../table/table.types';
import { TableComponent } from '../table/table.component';
import { TableCellCustomComponent } from '../table/table-cell-custom/table-cell-custom.component';
import { FormatDataService } from '../tools/format/format-data.service';
import { FilterCustomNewComponent } from './filter-custom-new/filter-custom-new.component';

@Component({
  selector: 'wfc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})


// todo: lets group related functionality into private services for the filter

export class FilterComponent implements OnInit, AfterContentInit, OnDestroy {

  private _subscription: Subscription[] = [];
  private _filters: IFilterDataGroup[] = [];
  private _orderedFilters: IFilterDataGroup[] = [];
  private _rows: any[] = [];
  private _filterText = '';
  private _selectedFilters: IFilterKeyValueLabel[] = [];
  private _expandedGroups: string[] = [];
  private _initialized = false;
  private _queryStringFilters: string;
  private _queryStringFiltersProcessed = false;
  private _queryStringParameters: IKeyValue[] = [];
  private _config: IFilterConfig;
  private _open = false;
  private _filteredRows: IFilterData;
  private _emitFilterChange = false;
  private _customComponentInstances: any[] = [];
  private _processedRows$: Subject<IFilterData> = new Subject();
  private _processData$: Subject<any> = new Subject();

  @Input()
  customFilterComponents: FilterCustomNewComponent[] = [];

  @Input()
  get filters(): IFilterDataGroup[] {
    return this._filters;
  }

  set filters(value: IFilterDataGroup[]) {

    this._filters = value;

    // Default type is String if is not specified
    this._filters.map(filter => {
      if (!filter.type) {
        filter.type = FilterDataType.STRING;
      }
    });

    if (value && Array.isArray(value)) {
      this._orderedFilters = [...value].sort((a: IFilterDataGroup, b: IFilterDataGroup) => a.order - b.order);
    }
  }

  /** In order to properly filter by text when we have for example a formatted date or a formatted number in the table
   * we need to pass the information of how the table is formatting those values.
   * This input it's optional and it should be only used when we have formatted fields in the table or a custom cell. */
  @Input()
  table: TableComponent;

  @Input()
  get rows(): any[] {
    return this._rows;
  }

  set rows(value: any[]) {

    if (!Array.isArray(value)) {
      throw new Error('The property rows need to be an Array.');
    }

    this._rows = value;
    this._processData();
  }

  @Input()
  get filterText(): string {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value.toLowerCase();
    this._filterRows();
  }

  @Input()
  trimOptions: boolean | number = 5;

  @Input()
  noDataText = '';

  @Input()
  noResultsText = `We're sorry. No records were found with that criteria.`;

  @Input()
  andFiltering = true;

  @Input()
  get config(): IFilterConfig {
    return this._config;
  }

  set config(value: IFilterConfig) {

    if (!value) {
      return;
    }

    if (!!value.filters) {
      this.filters = value.filters;
    }

    if (value.trimOptions !== undefined) { // You can't use the !! here since this is a boolean property
      this.trimOptions = value.trimOptions;
    }

    if (!!value.noDataText) {
      this.noDataText = value.noDataText;
    }

    if (!!value.noResultsText) {
      this.noResultsText = value.noResultsText;
    }

    if (value.andFiltering !== undefined) { // You can't use the !! here since this is a boolean property
      this.andFiltering = value.andFiltering;
    }
  }

  @Output()
  filterChange: EventEmitter<IFilterChangeEvent> = new EventEmitter();

  @HostBinding('class.open')
  get classOpen() {
    return this._open;
  }

  constructor(private _formatDataService: FormatDataService,
              private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams
      .pipe(take(1))
      .subscribe((params: any) => {
        if (params && params.filters) {
          this._queryStringFilters = params.filters;
          this._processQueryStringParams();
        }
      });

    this._subscription = [...this._subscription, this._processData$
      .asObservable()
      .pipe(debounceTime(250))
      .subscribe(() => this._processData())];
  }

  ngAfterContentInit() {
    this._initialized = true;
    this._processData();
  }

  ngOnDestroy() {
    this._subscription.map(sub => sub.unsubscribe());
  }

  close() {
    this._open = false;
  }

  toggle() {
    this._open = !this._open;
  }

  closeClick(event: MouseEvent) {
    event.preventDefault();
    this.close();
  }

  sectionIsExpanded(key: string) {
    return this._expandedGroups.indexOf(key) > -1;
  }

  handleCheckboxChange(event: ICheckbox) {

    const obj = {
      isCustom: false,
      key: event.key,
      label: event.label,
      value: event.value
    };

    event.checked ? this._addFilter(obj) : this._removeFilter(obj);

    this._filterRows();
  }

  handleDateChange(event: IFilterDateSelection) {

    const obj = {
      isCustom: false,
      key: event.key,
      label: event.label,
      value: event
    };

    // Only one filter at the time is allow when we have a date picker filter.
    this._removeFilter(obj);

    if (event.calendarSelection) {
      this._addFilter(obj);
    }

    this._filterRows();
  }

  handleSectionShowAllClick(event: string) {
    this._expandedGroups = ArrayTools.addOrRemove(this._expandedGroups, event);
    this._processData();
  }

  handleCustomFilterChange() {
    this._filterRows();
  }

  handleCustomComponentInstantiated(event: any) {

    const customComponent: any = this._customComponentInstances.find(instance => instance.key === event.key);

    if (customComponent) {
      customComponent.instance = event.instance;
      return;
    }

    this._customComponentInstances = [...this._customComponentInstances, event];
  }

  /**
   * This function add a custom filter so the filter component is aware of that a filter is apply.
   * This is to let know the filter component the we apply a filter in our custom component function.
   * The filter component will include for example the chiclet to show to the user the let the user know
   * what it's filtering. */
  addCustomFilter(filter: IKeyValueLabel) {

    if (this._selectedFilters.find(item => item.key === filter.key && item.value === filter.value)) {
      return;
    }

    this._selectedFilters = [...this._selectedFilters, { key: filter.key, value: filter.value, label: filter.label, isCustom: true }];

    this._processData$.next();
  }

  removeFilter(filter: IKeyValueLabel, sendEventToCustomComponents = true) {

    if (sendEventToCustomComponents) {
      this._customComponentInstances.map(customComponentInstances => customComponentInstances.instance.removeFilter(filter));
    }

    // The key / value is not present in the array, se we remove just for the key
    if (!this._selectedFilters.find(item => (item.key === filter.key && item.value === filter.value))) {
      this._selectedFilters = this._selectedFilters.filter(item => !(item.key === filter.key));
      this._processData$.next();
      return;
    }

    if (filter.value) {
      this._selectedFilters = this._selectedFilters.filter(item => !(item.key === filter.key && item.value === filter.value));
    } else {
      this._selectedFilters = this._selectedFilters.filter(item => !(item.key === filter.key));
    }

    this._processData$.next();
  }

  removeAllFilters() {
    this._customComponentInstances.map(customComponentInstances => customComponentInstances.instance.removeAllFilters());
    this._selectedFilters = [];
    this._processData();
  }

  update() {
    this._processData();
  }

  private _groupData() {
    this.orderedFilters.map((group: IFilterDataGroup) => {

      // We don't have any rows or the rows are not an array.
      // So we don't have nothing to do.
      if (!this.rows || !Array.isArray(this.rows)) {
        return [];
      }

      const { type, key, customComponentId } = group;

      group.items = [];
      group.itemsToShow = [];

      if (customComponentId) {

        const customComponent = this.customFilterComponents.find(component => component.id === customComponentId);

        if (!customComponent) {
          throw new Error(`There's no Custom Filter Component defined for the Custom Filter ${customComponentId}`);
        }

        group.items = [{
          type: FilterDataType.CUSTOM,
          customComponent: customComponent
        }];

        group.itemsToShow = group.items;

      } else {

        switch (type) {

          case FilterDataType.DATEPICKER:

            group.config = group.config || {}; // In case that there's no config object we initialize an empty one

            const selectedDate = this.nonCustomFilters.find(selectedFilter => selectedFilter.key === key);

            group.items = [{
              label: group.config.label,
              type: group.type,
              config: {
                ...group.config,
                selectedDate: selectedDate ? selectedDate.value.calendarSelection : null
              }
            }];

            break;

          default:

            let filterItems = this._filtersPossibleValues(type, key);

            filterItems.map(filter => {

              const count = this._countFilterMatches(group, filter);

              /** Massage the data to be passed to the checkbox */
              group.items = [...group.items, {
                checked: this.nonCustomFilters.find(selectedFilter => selectedFilter.key === key
                  && selectedFilter.value === filter) !== undefined,
                label: group.countItems ? `${filter} (${count})` : filter,
                type: group.type,
                value: filter
              }];
            });

            group.length = group.items.length;
        }

        /** If trimOptions is true, we trim the results for the Show All / Show Less functionality */
        if (this.trimOptions && !this._expandedGroups.find(expandedGroup => expandedGroup === group.key)) {
          group.itemsToShow = group.items.slice(0, (this.trimOptions as number));
        } else {
          group.itemsToShow = group.items;
        }
      }
    });
  }

  private _filtersPossibleValues(type: FilterDataType, key: string): any[] {

    let filterItems = [];

    this.rows.map(row => {
      filterItems = [...filterItems, ...row[key]];
    });

    /** Remove nulls */
    filterItems = filterItems.filter(filter => filter !== null && filter !== '');

    /** Remove the duplicated entries */
    filterItems = ArrayTools.unique(filterItems);

    /** Sort ascending */
    filterItems = filterItems.sort((a, b) => ArrayTools.compareDataType(a, b, type));

    return filterItems;
  }

  private _getCustomCellComponentInstance(key: string): TableCellCustomComponent {
    const customCellId = this.table.columns.find(column => column.customCellId && column.key === key);
    return !customCellId ? undefined : this.table.customTableCellsComponents.find(customTableCells => customTableCells.id === customCellId.customCellId);
  }

  /** If countItems is true we count the amount of rows that match the filter criteria */
  private _countFilterMatches(group: IFilterDataGroup, filter): number {

    const { key } = group;

    return group.countItems ? this.rows.filter(row => {

      let include = false;

      /** The field cell it's an array, so we need to count based in all the values of the array */
      if (Array.isArray(row[key])) {
        for (let i = 0; i < row[key].length; i++) {
          if (row[key][i] === filter) {
            include = true;
            break;
          }
        }

        return include;
      }

      /** The field cell isn't an array */
      if (row[key] === filter) {
        include = true;
      }

      return include;

    }).length : 0;
  }

  private _filterRows(emitFilterChange = true) {

    this._filteredRows = {
      filterCount: 0,
      noDataText: (this.rows && this.rows.length) ? '' : this.noDataText,
      rows: [...(this.rows || [])],
      selectedFilters: []
    };

    /** Filter the rows based on the text input of the user */
    if (this.filterText !== '') {

      this._filteredRows.rows = this._filteredRows.rows.filter(row => {

        let include = false;

        for (let key of Object.keys(row)) {

          const tableColumn = this.table.columns.find(column => column.key === key);
          const rowData = row[key];

          if (tableColumn && rowData) {

            const customCellComponent = this._getCustomCellComponentInstance(key);

            // There is a custom cell component for this cell and it has a function to return possible values to filter
            if (customCellComponent && customCellComponent['matchSearchText']) {
              if (customCellComponent['matchSearchText'](this._formatDataService.transform(tableColumn.type, tableColumn.format, rowData), this.filterText)) {
                include = true;
                break;
              }
            } else {

              /** As we have the information of how the table is formatting the columns we need to format the data
               * in the same way before match against the text */
              const formattedCell: string | any[] = this._formatDataService.transform(tableColumn.type, tableColumn.format, rowData);

              if (Array.isArray(formattedCell)) {
                if (formattedCell.map(c => c.toString().trim()).join(' ').toLowerCase().includes(this.filterText)) {
                  include = true;
                  break;
                }
              } else {
                if (formattedCell.toString().trim().toLowerCase().includes(this.filterText)) {
                  include = true;
                  break;
                }
              }
            }
          }
        }

        return include;
      });
    }

    /** Pass the data to the custom filters */
    if (this.customFilterComponents.length) {

      this.customFilterComponents.map(filterCustomComponent => {

        const customComponent = this._customComponentInstances.find(instance => instance.id === filterCustomComponent.id);

        if (customComponent) {
          this._filteredRows.rows = customComponent.instance['filterData'](this._filteredRows.rows, this._queryStringParameters.filter(param => param.key === customComponent.instance.filterDataGroup.key));
        }
      });

      if (!Array.isArray(this._filteredRows.rows)) {
        throw new Error('The filterData function from the custom filter is not returning an Array. Please check the output of the function.');
      }
    }

    /** Filter the rows based on the selected filters by the user */
    if (this.filtersCount) {

      this._filteredRows.filterCount = this.filtersCount;

      this._filteredRows.selectedFilters = this._selectedFilters;

      if (this.nonCustomFilters.length) { // Beside the customs filters there are regular filters, so we need to filter the rows.
        if (this.andFiltering) {
          this._filteredRows.rows = this._andFiltering(this._filteredRows.rows);
        } else {
          this._filteredRows.rows = this._orFiltering(this._filteredRows.rows, this.nonCustomFilters);
        }
      }
    }

    if (this.rows && this.rows.length && !this._filteredRows.rows.length) {
      this._filteredRows.noDataText = this.noResultsText;
    }

    // Format the date output
    this._filteredRows.selectedFilters = this._filteredRows.selectedFilters.map(filter => {

      if (filter.value.calendarSelection && filter.value.calendarSelection.date) {

        if (filter.value.rangeSelection) {
          return {
            ...filter,
            value: `${this._formatDataService.transform(TableDataType.DATE, filter.value.dateFormat, filter.value.calendarSelection.date)} - ${this._formatDataService.transform(TableDataType.DATE, filter.value.dateFormat, filter.value.calendarSelection.dateTo)}`
          };
        }

        return {
          ...filter,
          value: `${this._formatDataService.transform(TableDataType.DATE, filter.value.dateFormat, filter.value.calendarSelection.date)}`
        };
      }

      return { ...filter };
    });

    this._processedRows$.next(this._filteredRows);

    if (emitFilterChange) {
      this.filterChange.emit(this.getFormattedFilterChangeEvent);
    }
  }

  private _andFiltering(rows: any[]): any[] {

    const uniqueFiltersGroupsKey = ArrayTools.unique(this.nonCustomFilters.map(selectedFilter => selectedFilter.key));
    let filteredRows = [...rows];

    uniqueFiltersGroupsKey.map(filterKey => {

      const filters: IKeyValueLabel[] = this.nonCustomFilters.filter(filter => filter.key === filterKey);

      filteredRows = this._orFiltering(filteredRows, filters);
    });

    return filteredRows;
  }

  private _orFiltering(rows: any[], selectedFilter: IKeyValueLabel[]): any[] {

    return rows.filter(row => {

      let include = false;

      for (let filter of selectedFilter) {

        const { key, value } = filter;
        const rowCell = row[key];
        const customCellComponent = this._getCustomCellComponentInstance(key);

        // There is a custom cell component for this cell and it has a function to return possible values to filter
        if (customCellComponent && customCellComponent['matchFilter']) {
          include = customCellComponent['matchFilter'](rowCell, selectedFilter.filter(s => s.key === key).map(s => s.value));
        } else {
          include = Array.isArray(rowCell) ? this._filterValueInArray(rowCell, value) : this._filterValue(rowCell, value);
        }

        if (include) { // As one value fo the row match the criteria we don't need to keep searching
          break;
        }
      }

      return include;
    });
  }

  private _filterValueInArray(arrayOfValues: any[], filterValue: IFilterDateSelection | string): boolean {

    if ((filterValue as IFilterDateSelection).calendarSelection) {

      // Filtering by date
      const filterDateSelection: IFilterDateSelection = (filterValue as IFilterDateSelection);

      for (let value of arrayOfValues) {
        if (filterDateSelection.rangeSelection) {
          if (DateTools.removeTime(DateTools.convertToDate(value)).getTime() >= filterDateSelection.calendarSelection.date.getTime() &&
            DateTools.removeTime(DateTools.convertToDate(value)) <= filterDateSelection.calendarSelection.dateTo) {
            return true;
          }
        } else {
          if (DateTools.removeTime(DateTools.convertToDate(value)).getTime() === filterDateSelection.calendarSelection.date.getTime()) {
            return true;
          }
        }
      }

      return false;
    }

    return arrayOfValues.includes(filterValue);
  }

  private _filterValue(value: any, filterValue: IFilterDateSelection | string): boolean {

    // We are filtering by a calendarSelection
    if ((filterValue as IFilterDateSelection).calendarSelection) {

      const filterDateSelection: IFilterDateSelection = (filterValue as IFilterDateSelection);

      if (filterDateSelection.rangeSelection) {

        if (filterDateSelection.calendarSelection && filterDateSelection.calendarSelection.dateTo) {
          return DateTools.removeTime(DateTools.convertToDate(value)).getTime() >= filterDateSelection.calendarSelection.date.getTime() &&
            DateTools.removeTime(DateTools.convertToDate(value)).getTime() <= filterDateSelection.calendarSelection.dateTo.getTime();
        } else {
          return true;
        }

      } else {
        return DateTools.convertToDate(value).getTime() === filterDateSelection.calendarSelection.date.getTime();
      }
    }

    // Regular filtering by text
    return value === filterValue;
  }

  private _processData() {

    if (!this._initialized) {
      return;
    }

    this._groupData();

    if (!this._queryStringFiltersProcessed) {
      this._addQueryStringFilters();
    }

    if (this._emitFilterChange) {
      this._emitFilterChange = false;
      this._filterRows();
    } else {
      this._filterRows(false);
    }
  }

  private _addFilter(selection: IFilterKeyValueLabel) {

    const label = this.filters.find(group => group.key === selection.key).label;

    if (!this._selectedFilters.find(item => item.key === selection.key && item.value === selection.value)) {
      this._selectedFilters = [...this._selectedFilters, { ...selection, label, isCustom: false }];
    }
  }

  private _removeFilter(selection: IFilterKeyValueLabel) {
    if (!this._selectedFilters.find(item => (item.key === selection.key && item.value === selection.value))) {
      this._selectedFilters = this._selectedFilters.filter(item => !(item.key === selection.key));
    } else {
      this._selectedFilters = this._selectedFilters.filter(item => !(item.key === selection.key && item.value === selection.value));
    }
  }

  private _addQueryStringFilters() {

    if (!this._queryStringParameters.length) {
      return;
    }

    this._queryStringParameters.map(param => {

      const filterGroup: IFilterDataGroup = this.orderedFilters.find(group => group.key === param.key && group.type !== FilterDataType.CUSTOM);

      if (filterGroup) {

        const filter = filterGroup.items.find(item => (item.value || '').toLowerCase() === param.value.toString().toLowerCase());

        if (filter) { // As this is a filter that it's present in the view we need to check it

          filter.checked = true;

          this._addFilter({
            isCustom: false,
            key: filterGroup.key,
            label: filterGroup.label,
            value: filter.value
          });

          this._queryStringFiltersProcessed = true;

        } else {

          if (filterGroup.type === FilterDataType.DATEPICKER) {

            let datepickerObj = {
              isCustom: false,
              label: filterGroup.label,
              key: filterGroup.key,
              value: {
                dateFormat: filterGroup.config.dateFormat || 'dd MMM yyyy'
              }
            };

            if (!filterGroup.config.rangeSelection) {

              const date = DateTools.YYYYMMDDToDate((param.value as string));

              if (date) {
                this._addFilter({
                  ...datepickerObj,
                  value: {
                    ...datepickerObj.value,
                    calendarSelection: { date, dateTo: null }
                  }
                });

                this._emitFilterChange = true;
                this._queryStringFiltersProcessed = true;
              }

            } else {

              const date = DateTools.YYYYMMDDToDate((param.value as string).substr(0, 8));
              const dateTo = DateTools.YYYYMMDDToDate((param.value as string).substr(8, 8));

              if (date && dateTo) {
                this._addFilter({
                  ...datepickerObj,
                  value: {
                    ...datepickerObj.value,
                    calendarSelection: { date, dateTo },
                    rangeSelection: true
                  }
                });

                this._emitFilterChange = true;
                this._queryStringFiltersProcessed = true;
              }
            }
          }
        }
      }

    });
  }

  private _processQueryStringParams() {

    this._queryStringFilters.split(',').filter(param => param.split(':').length === 2).map(param => {

      const paramSplitted = param.split(':');

      this._queryStringParameters = [...this._queryStringParameters, {
        key: paramSplitted[0],
        value: paramSplitted[1]
      }];

    });
  }

  get getFormattedFilterChangeEvent(): IFilterChangeEvent {

    let tmpObject: IFilterChangeEvent = {
      appliedFilters: {},
      count: {
        totalRows: this._rows.length,
        totalFilteredRows: this.hasFiltersApplied ? this._filteredRows.rows.length : this._rows.length
      },
      filteredRows: this.hasFiltersApplied ? this._filteredRows.rows : this._rows
    };

    this._selectedFilters.map(filter => {
      tmpObject.appliedFilters[filter.key] = [...tmpObject.appliedFilters[filter.key] || [], filter.value];
    });

    return tmpObject;
  }

  get processedRows$(): Observable<IFilterData> {
    return this._processedRows$
      .asObservable()
      .pipe(auditTime(250));
  }

  get orderedFilters() {
    return this._orderedFilters;
  }

  get filtersCount() {
    return this._selectedFilters.length;
  }

  get nonCustomFilters() {
    return this._selectedFilters.filter(filter => !filter.isCustom);
  }

  get filteredRows() {
    return this._filteredRows.rows;
  }

  get hasFiltersApplied() {
    return (this._filteredRows.filterCount || this._filterText);
  }
}
