import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IKeyValueLabel } from '../models/data.types';
import { FilterComponent } from '../filter/filter.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SearchComponent } from '../search/search.component';
import { IFilterChangeEvent, IFilterConfig, IFilterData } from '../filter/filter.types';
import { IPagination, IPaginatorConfig } from '../paginator/paginator.types';
import { ITableCellClickEvent, ITableConfig } from '../table/table.types';
import { TableCellCustomComponent } from '../table/table-cell-custom/table-cell-custom.component';
import { Subscription } from 'rxjs';
import { TableComponent } from '../table/table.component';
import { FilterCustomNewComponent } from '../filter/filter-custom-new/filter-custom-new.component';

@Component({
  selector: 'wfc-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit, OnDestroy {

  private _initialized = false;
  private _processedRows: Subscription;

  filterCount = 0;

  filterSelected: IKeyValueLabel[] = [];

  filteredRows: any[] = [];

  tablePagination: IPagination;

  noDataText = '';

  @ViewChild(PaginatorComponent, {static: false})
  paginator: PaginatorComponent;

  @ViewChild(FilterComponent, {static: false})
  filterSidebar: FilterComponent;

  @ViewChild(SearchComponent, {static: false})
  searchComponent: SearchComponent;

  @ViewChild(TableComponent, {static: false})
  table: TableComponent;

  @Input()
  configFilters: IFilterConfig;

  @Input()
  configTable: ITableConfig;

  @Input()
  configPaginator: IPaginatorConfig;

  @Input()
  customFilterComponents: FilterCustomNewComponent[] = [];

  @Input()
  customTableCellComponents: TableCellCustomComponent[] = [];

  @Input()
  data: any[] = [];

  @Input()
  scrollable = true;

  @Output()
  tableCellClick: EventEmitter<ITableCellClickEvent> = new EventEmitter();

  @Output()
  filterRemoved: EventEmitter<IKeyValueLabel> = new EventEmitter();

  @Output()
  filterChange: EventEmitter<IFilterChangeEvent> = new EventEmitter();

  @Output()
  clearSearchButtonClick: EventEmitter<any> = new EventEmitter();

  @Output()
  customCellAction: EventEmitter<any> = new EventEmitter();

  constructor(private _changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._processedRows = this.filterSidebar.processedRows$.subscribe((filterData: IFilterData) => {

      this._initialized = true;

      this.filteredRows = filterData.rows;
      this.filterCount = filterData.filterCount;
      this.filterSelected = filterData.selectedFilters;
      this.noDataText = this.initialized ? filterData.noDataText : '';
      this._resetPagination();

      this._changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this._processedRows.unsubscribe();
  }

  filterButtonClick() {
    this.filterSidebar.toggle();
  }

  searchChange(event: string) {
    this.filterSidebar.filterText = event;
  }

  handleRemoveChiclet(event: IKeyValueLabel) {
    this.filterSidebar.removeFilter(event);
    this.filterRemoved.emit(event);
  }

  paginatorChange(event: IPagination) {
    this.tablePagination = event;
    this._changeDetectorRef.detectChanges();
  }

  tableSortChange() {
    this._resetPagination();
  }

  handleTableCellClick(event: ITableCellClickEvent) {
    this.tableCellClick.emit(event);
  }

  handleClearSearchButtonClick() {
    this.searchComponent.reset();
    this.filterSidebar.removeAllFilters();
    this.clearSearchButtonClick.emit();
  }

  handleCustomCellAction(event: any) {
    this.customCellAction.emit(event);
  }

  update() {
    this.filterSidebar.update();
  }

  removeFilter(filter: IKeyValueLabel) {

    if (!this.filterSidebar) {
      return;
    }

    this.filterSidebar.removeFilter(filter);
  }

  handleFilterChange(event: IFilterChangeEvent) {
    this.filterChange.emit(event);
  }

  private _resetPagination() {

    if (!this.paginator) {
      return;
    }

    this.paginator.length = this.filteredRows.length;
    this.paginator.reset();
    this.tablePagination = this.paginator.paginationData;
  }

  get initialized() {
    return this._initialized;
  }
}
