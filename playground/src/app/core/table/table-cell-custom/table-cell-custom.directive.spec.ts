import { TableCellCustomDirective } from './table-cell-custom.directive';
import { TableCellCustomComponent } from './table-cell-custom.component';
import {ListViewComponent} from '../../list-view/list-view.component';

describe('TableCellCustomDirective', () => {
  it('should create an instance', () => {
    const directive = new TableCellCustomDirective(new ListViewComponent(null));
    directive.customCells = new TableCellCustomComponent(null);
    directive.ngAfterContentInit();
    expect(directive).toBeTruthy();
  });

  it('should create an instance 2', () => {
    const directive = new TableCellCustomDirective(new ListViewComponent(null));
    directive.customCells = null;
    expect(directive).toBeTruthy();
  });
});
