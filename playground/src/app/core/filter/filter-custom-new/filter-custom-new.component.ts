import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IFilterDataGroup } from '../filter.types';
import { IKeyValueLabel } from '../../models/data.types';
import {ComponentType} from '../../configuration/portal/portal.types';

@Component({
  selector: 'wfc-filter-custom-new',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterCustomNewComponent {

  @Input()
  id: string;

  @Input()
  filterDataGroup: IFilterDataGroup;

  @Output()
  filterChange: EventEmitter<any> = new EventEmitter();

  @Output()
  customFilterAdded: EventEmitter<IKeyValueLabel> = new EventEmitter();

  @Output()
  customFilterRemoved: EventEmitter<IKeyValueLabel> = new EventEmitter();

  getInstanceOf(): ComponentType<any> {
    return FilterCustomNewComponent;
  }
}
