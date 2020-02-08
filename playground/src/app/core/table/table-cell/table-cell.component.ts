import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  NgZone, OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { SortType } from '../../models/data.types';
import { ITableCellClickEvent, ITableColumn, TableDataType } from '../table.types';
import { PortalHostDirective } from '../../configuration/portal/portal.directive';
import { ComponentPortal } from '../../configuration/portal/portal';
import { TableCellCustomComponent } from '../table-cell-custom/table-cell-custom.component';
import { FormatDataService } from '../../tools/format/format-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: '[wfc-table-cell]',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellComponent implements AfterViewInit, OnDestroy {

  private _subscription: Subscription[] = [];

  /** The portal host inside of this container into which the custom cell will be loaded. */
  @ViewChild(PortalHostDirective, {static: false})
  portalHost: PortalHostDirective;

  @Input()
  isHeader = false;

  @Input()
  column: ITableColumn;

  @Input()
  showLabel = false;

  @Input()
  value: string | string[] = '';

  @Input()
  order: SortType = SortType.NONE;

  @Input()
  rowData: any[];

  @Input()
  customComponentContent: TableCellCustomComponent;

  // Used for the scrolling functionality
  @Input()
  first = false;

  @Input()
  parentElement: ElementRef;

  @Output()
  headerCellClick: EventEmitter<any> = new EventEmitter();

  @Output()
  cellClick: EventEmitter<ITableCellClickEvent> = new EventEmitter();

  @Output()
  customCellAction: EventEmitter<any> = new EventEmitter();

  constructor(public elementRef: ElementRef,
              private _ngZone: NgZone,
              private _formatDataService: FormatDataService) {
  }

  ngAfterViewInit() {

    if (this.customComponentContent && this.portalHost && !this.portalHost.hasAttached()) {

      this._ngZone.runOutsideAngular(() => {

        let customCellComponentRef: ComponentRef<TableCellCustomComponent>;

        try {
          customCellComponentRef = this.portalHost.attachComponentPortal(new ComponentPortal(this.customComponentContent.getInstanceOf()));
        } catch (e) {
          throw new Error(`The custom cell component needs to have defined the function getInstanceOf() that returns the ComponentType.
        
        Example of table-cell-custom-array:
        
        getInstanceOf(): ComponentType<any> {
          return TableCellCustomArrayComponent;
        }`);
        }

        customCellComponentRef.instance.parentElement = this.parentElement;

        customCellComponentRef.instance.data = {
          isHeader: this.isHeader,
          cellData: this.value,
          columnData: this.column,
          rawRows: this.rowData
        };

        this._subscription = [...this._subscription, customCellComponentRef.instance.action
          .asObservable()
          .subscribe(data => this.customCellAction.emit(data))];
      });
    }
  }

  ngOnDestroy() {
    this._subscription.map(sub => sub.unsubscribe());
  }

  handleHeaderCellClick(event: MouseEvent) {
    event.preventDefault();
    this.headerCellClick.emit(this);
  }

  handleCellClick(event: MouseEvent, rowData: any[]) {
    event.preventDefault();
    this.cellClick.emit({
      cell: this,
      rowData
    });
  }

  formatData(column: ITableColumn, value: any): string {
    return this._formatDataService.transform(column.type, column.format, value);
  }

  get canSort() {
    return this.column.type !== TableDataType.NONE;
  }
}
