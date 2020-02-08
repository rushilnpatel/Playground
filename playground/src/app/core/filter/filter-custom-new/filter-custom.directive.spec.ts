import { ListViewComponent } from '../../list-view/list-view.component';
import { FilterCustomDirective } from './filter-custom.directive';
import { FilterCustomNewComponent } from './filter-custom-new.component';

describe('FilterCustomDirective', () => {
  it('should create an instance', () => {
    const directive = new FilterCustomDirective(new ListViewComponent(null));
    directive.filters = new FilterCustomNewComponent();
    expect(directive).toBeTruthy();
  });

  it('should create an instance When filter component doesnot exist', () => {
    const directive = new FilterCustomDirective(null);
    directive.filters = null;

    expect(directive).toBeTruthy();
  });

  it('should create an instance', () => {
    const directive = new FilterCustomDirective(new ListViewComponent(null));
    directive.filters = new FilterCustomNewComponent();
    directive.ngAfterContentInit();
    expect(directive).toBeTruthy();
  });
});
