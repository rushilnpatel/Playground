import { AfterContentInit, Directive, Host, Input, Self } from '@angular/core';
import { ListViewComponent } from '../../list-view/list-view.component';
import { FilterCustomNewComponent } from './filter-custom-new.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[customFilters]'
})
export class FilterCustomDirective implements AfterContentInit {

  private _filters: FilterCustomNewComponent[] = [];

  /** References the custom filters instances. */
  @Input('customFilters')
  get filters(): FilterCustomNewComponent | FilterCustomNewComponent[] {
    return this._filters;
  }

  set filters(value: FilterCustomNewComponent | FilterCustomNewComponent[]) {

    if (value && !Array.isArray(value)) {
      this._filters = [value];
      return;
    }

    this._filters = (value as FilterCustomNewComponent[]);
  }

  constructor(@Host() @Self() private _listViewComponent: ListViewComponent) {
  }

  ngAfterContentInit() {
    this._listViewComponent.customFilterComponents = (this.filters as FilterCustomNewComponent[]);
  }
}
