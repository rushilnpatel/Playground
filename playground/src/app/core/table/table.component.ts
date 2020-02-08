import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { WindowResizeService } from '../tools/window/window-resize.service';
import { asyncScheduler, fromEvent, Subject, Subscription } from 'rxjs';
import { SortType } from '../models/data.types';
import * as ArrayTools from '../tools/array';
import { IPagination } from '../paginator/paginator.types';
import { ITableCellClickEvent, ITableColumn, ITableConfig, ITableSort, TableDataType } from './table.types';
import { TableCellCustomComponent } from './table-cell-custom/table-cell-custom.component';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { TableRowComponent } from './table-row/table-row.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { convertToCSV } from '../tools/object';
import { FormatDataService } from '../tools/format/format-data.service';

@Component({
  selector: '[wfc-table]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterContentInit, AfterViewChecked, OnDestroy {

  private _columns: ITableColumn[] = [];
  private _orderedColumns: ITableColumn[] = [];
  private _config: ITableConfig;
  private _subscriptions: Subscription[] = [];
  private _checkScrollableBehavior$: Subject<any> = new Subject();
  private _drawShadow$: Subject<boolean> = new Subject();

  isSmallView = false;
  scrollableBehavior = false;

  @ViewChildren('headerRow')
  headerRow: QueryList<TableRowComponent>;

  @ViewChild('headerCell', {static: false})
  headerCell: TableCellComponent;

  @ViewChildren('contentRows')
  contentRows: QueryList<TableCellComponent>;

  @Input()
  get columns(): ITableColumn[] {
    return this._columns;
  }

  set columns(value: ITableColumn[]) {

    this._columns = value;

    // Default type is String if is not specified
    this._columns.map(column => {
      if (!column.type) {
        column.type = TableDataType.STRING;
      }
    });

    this._orderedColumns = [...this._columns].sort((a: ITableColumn, b: ITableColumn) => a.order - b.order);
  }

  @Input()
  rows: any[];

  @Input()
  sort: ITableSort = {
    column: 0,
    order: SortType.ASCENDING
  };

  @Input()
  pagination: IPagination;

  @Input()
  scrollable = true;

  @Input()
  customTableCellsComponents: TableCellCustomComponent[] = [];

  @Input()
  get config(): ITableConfig {
    return this._config;
  }

  set config(value: ITableConfig) {

    if (!value) {
      return;
    }

    if (!!value.columns) {
      this.columns = value.columns;
    }

    if (value.scrollable !== undefined) { // You can't use the !! here since this is a boolean property
      this.scrollable = value.scrollable;
    }

    if (!!value.sort) {
      this.sort = value.sort;
    }
  }

  @Output()
  sortChange: EventEmitter<any> = new EventEmitter();

  @Output()
  cellClick: EventEmitter<ITableCellClickEvent> = new EventEmitter();

  @Output()
  customCellAction: EventEmitter<any> = new EventEmitter();

  @HostBinding('class.scrollable')
  get classScrollable() {
    return this.scrollable;
  }

  @HostBinding('class.even')
  get classEven() {
    return this.rows.length % 2 === 0;
  }

  @HostBinding('class.odd')
  get classOdd() {
    return this.rows.length % 2 !== 0;
  }

  constructor(private _windowResizeService: WindowResizeService,
              private _changeDetectorRef: ChangeDetectorRef,
              private _renderer: Renderer2,
              private _ngZone: NgZone,
              private _formatDataService: FormatDataService,
              public elementRef: ElementRef) {
  }

  ngOnInit() {

    this.isSmallView = this._windowResizeService.getBreakpoint < 1;

    this._subscriptions = [...this._subscriptions, this._windowResizeService.windowResize().subscribe(breakpoint => {

      const fitBreakPoint = breakpoint < 1;

      if (fitBreakPoint !== this.isSmallView) {
        this.isSmallView = fitBreakPoint;
        this._changeDetectorRef.markForCheck();
      }

      if (this.scrollable) {
        this._emitCheckScrollableBehavior();
      }
    })];

    if (this.scrollable) {
      this._subscriptions = [...this._subscriptions, this._checkScrollableBehavior$
        .asObservable()
        .pipe(throttleTime(1000 / 60, asyncScheduler, { leading: true, trailing: true }))
        .subscribe(() => {
          this._calcScrollableBehavior();
          this._moveFirstRow(this.elementRef.nativeElement.scrollLeft);
        })];

      this._subscriptions = [...this._subscriptions, this._drawShadow$
        .asObservable()
        .pipe(distinctUntilChanged())
        .subscribe(() => {
          this._changeDetectorRef.detectChanges();
          setTimeout(() => {
            this._moveFirstRow(this.elementRef.nativeElement.scrollLeft);
          });
        })];

      this._ngZone.runOutsideAngular(() => {
        this._subscriptions = [...this._subscriptions, fromEvent(this.elementRef.nativeElement, 'scroll')
          .pipe(distinctUntilChanged())
          .subscribe((event: any) => this._moveFirstRow(event.target.scrollLeft))];
      });
    }
  }

  private _moveFirstRow(left: number) {
    if (this.scrollableBehavior && this.headerCell && this.headerCell.elementRef) {
      this._renderer.setStyle(this.headerCell.elementRef.nativeElement, 'transform', `translate3d(${left}px, 0, 0)`);
    }

    if (this.scrollableBehavior && this.contentRows) {
      this.contentRows.filter(row => row.first).map(row => {
        this._renderer.setStyle(row.elementRef.nativeElement, 'transform', `translate3d(${left}px, 0, 0)`);
      });
    }
  }

  ngAfterContentInit() {
    /** Check that all the custom cell have an Id */
    this.customTableCellsComponents.map(customTableCell => {
      if (!customTableCell.id) {
        throw new Error(`All the custom cells components needs an Id attribute in order to relate the custom column to the custom cell component. Example: <wfc-table-cell-custom-array id="cellArray"></wfc-table-cell-custom-array>`);
      }
    });
  }

  ngAfterViewChecked() {
    this._emitCheckScrollableBehavior();
  }

  ngOnDestroy() {
    this._subscriptions.map(sub => sub.unsubscribe());
  }

  headerClick(column: ITableColumn) {

    const columnIndex = this._orderedColumns.findIndex(col => col === column);

    this.sort = {
      column: columnIndex,
      order: this._getNextOrder(columnIndex === this.sort.column ? this.sort.order : SortType.NONE)
    };

    this.sortChange.emit();
  }

  handleCellClick(event: ITableCellClickEvent) {

    let rowClicked = [];

    // We add all the related information of each columns, like for example label, key, order, etc.
    event.rowData.map((row, index) => {
      rowClicked = [...rowClicked, { ...this.orderedColumns[index], value: row }];
    });

    this.cellClick.emit({
      cell: event.cell,
      rowData: rowClicked
    });
  }

  handleCustomCellAction(event: any) {
    this.customCellAction.emit(event);
  }

  getCustomCellContent(index: number, isHeader = false): TableCellCustomComponent {

    const column: ITableColumn = this.orderedColumns[index];

    if (!column || (isHeader ? !column.customHeaderCellId : !column.customCellId) || !this.customTableCellsComponents.length) {
      return null;
    }

    return this.customTableCellsComponents.find(customTableCell => customTableCell.id === (isHeader ? column.customHeaderCellId : column.customCellId));
  }

  private _getNextOrder(currentOrder: SortType) {
    return currentOrder === SortType.ASCENDING ? SortType.DESCENDING : SortType.ASCENDING;
  }

  private _sortRows(rows: any[]): string[] {

    const { column, order } = this.sort;

    if (!this._orderedColumns.length || column === null || order === SortType.NONE) {
      return rows;
    }

    const { type, key } = this._orderedColumns[column];
    let sortedRows = [];

    const customCellComponent = this._getCustomCellComponentInstance(key);

    if (customCellComponent && customCellComponent['getSortValue']) {
      sortedRows = [...rows].sort((a, b) => {
        return ArrayTools.compareDataType(customCellComponent['getSortValue'](a[key]), customCellComponent['getSortValue'](b[key]), type);
      });
    } else {
      sortedRows = [...rows].sort((a, b) => ArrayTools.compareDataType(a[key], b[key], type));
    }

    return order === SortType.ASCENDING ? sortedRows : sortedRows.reverse();
  }

  private _calcScrollableBehavior() {

    if (this.headerRow && this.headerRow.first) {
      this.scrollableBehavior = this.elementRef.nativeElement.getBoundingClientRect().width < this.headerRow.first.elementRef.nativeElement.getBoundingClientRect().width;
    }

    this._drawShadow$.next(this.scrollableBehavior);
  }

  private _emitCheckScrollableBehavior() {
    this._ngZone.runOutsideAngular(() => { // To avoid a loop in the ngAfterContentInit lifecycle
      if (this.scrollable && !this.isSmallView) {
        this._checkScrollableBehavior$.next();
      }
    });
  }

  private _getCustomCellComponentInstance(key: string): TableCellCustomComponent {
    const customCellId = this.columns.find(column => column.customCellId && column.key === key);
    return !customCellId ? undefined : this.customTableCellsComponents.find(customTableCells => customTableCells.id === customCellId.customCellId);
  }

  get orderedColumns() {
    return this._orderedColumns;
  }

  get processedRows() {

    if (!this.rows || !Array.isArray(this.rows)) {
      return [];
    }

    let rows = this._sortRows(this.rows);

    if (this.pagination) {
      rows = rows.slice(this.pagination.from, this.pagination.to + 1);
    }

    return rows.map(row => this._orderedColumns.map(column => row[column.key]));
  }

  get processedRowsNoPagination() {

    if (!this.rows || !Array.isArray(this.rows)) {
      return [];
    }

    return this._sortRows(this.rows).map(row => this._orderedColumns.map(column => row[column.key]));
  }

  get isScrollable() {
    return this.scrollable && !this.isSmallView;
  }

  // TODO: this should be part of a custom component or the parent view. not all tables will need this

  get exportToCSVData(): string {

    const rows = this.processedRowsNoPagination;
    const columns = this.orderedColumns.filter(column => !column.excludeFromExport);
    let tmpArray = [];

    rows.map(row => {

      let tmpObject = {};

      columns.map((column, index) => {

        const customCellComponent = this._getCustomCellComponentInstance(column.key);

        if (customCellComponent && customCellComponent['getExportCVSString']) {
          tmpObject[column.label] = customCellComponent['getExportCVSString'](row[index]);
        } else {
          tmpObject[column.label] = this._formatDataService.transform(column.type, column.format, row[index]);
        }
      });

      tmpArray = [...tmpArray, tmpObject];
    });

    return convertToCSV(tmpArray);
  }
}
