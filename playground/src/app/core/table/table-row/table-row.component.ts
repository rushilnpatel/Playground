import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
  selector: '[wfc-table-row]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {

  constructor(public elementRef: ElementRef) {
  }
}
