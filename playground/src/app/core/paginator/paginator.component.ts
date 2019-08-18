import { AfterContentInit, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { IPagination, IPaginatorConfig } from './paginator.types';

@Component({
  selector: '[wfc-paginator]',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements AfterContentInit {

  private _config: IPaginatorConfig;

  @Input()
  pageIndex = 0;

  /** Number of items to display on a page. */
  @Input()
  pageSize = 25;

  /** The length of the total number of items that are being paginated. */
  @Input()
  length = 0;

  @Input()
  get config(): IPaginatorConfig {
    return this._config;
  }

  set config(value: IPaginatorConfig) {

    if (!value) {
      return;
    }

    if (!!value.pageIndex) {
      this.pageIndex = value.pageIndex;
    }

    if (!!value.pageSize) {
      this.pageSize = value.pageSize;
    }
  }

  @Output()
  pageChange: EventEmitter<IPagination> = new EventEmitter();

  @HostBinding('class.hide')
  get classOpen() {
    return this.length === 0 || this.length <= this.pageSize;
  }

  ngAfterContentInit() {
    this._emitChangeEvent();
  }

  prevClick(event: MouseEvent) {
    event.preventDefault();
    this.pageIndex -= 1;
    this._emitChangeEvent();
  }

  nextClick(event: MouseEvent) {
    event.preventDefault();
    this.pageIndex += 1;
    this._emitChangeEvent();
  }

  reset() {
    this.pageIndex = 0;
  }

  private _emitChangeEvent() {
    this.pageChange.emit(this.paginationData);
  }

  get btnPrevEnabled() {
    return this.pageIndex > 0;
  }

  get btnNextEnabled() {
    return this.to < this.length;
  }

  get from() {
    return this.pageIndex * this.pageSize;
  }

  get to() {
    return (this.pageIndex + 1) * this.pageSize;
  }

  get paginationFrom() {
    return this.length === 0 ? 0 : this.from + 1;
  }

  get paginationTo() {
    return Math.min(this.length, this.to);
  }

  get paginationData(): IPagination {
    return {
      from: this.from,
      to: this.paginationTo - 1,
      length: this.length
    };
  }
}
