import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { IconModule } from '../icon/icon.module';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ],
      imports: [IconModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.config = { pageIndex: 1, pageSize: 10};
    fixture.detectChanges();
  });

  it('should create PaginatorComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Given #prevClick function is invoked then it should decrease page index by 1', () => {
    component.pageIndex = 5;
    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    component.prevClick(evt);

    expect(component.pageIndex).toEqual(4);
  });

  it('Given #nextClick function is invoked then it should increase page index by 1', () => {
    component.pageIndex = 5;
    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    component.nextClick(evt);

    expect(component.pageIndex).toEqual(6);
  });

  it('Given classOpen property is called then call should go to function and return true', () => {
    component.length = 4;
    component.pageIndex = 5;
    fixture.detectChanges();

    const spy = spyOnProperty(component, 'classOpen', 'get').and.callThrough();

    expect(typeof component.classOpen).toEqual('boolean');
    expect(component.classOpen).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('Given classOpen property is called then call should go to function ', () => {
    component.length = 0;
    fixture.detectChanges();
    const spy = spyOnProperty(component, 'classOpen', 'get').and.callThrough();

    expect(typeof component.classOpen).toEqual('boolean');
    expect(component.classOpen).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('Given #reset function is invoked then it pageIndex should reset to 0', () => {
    component.reset();

    expect(component.pageIndex).toEqual(0);
  });

  it('Given #config property is called then call should go through', () => {
    const spy = spyOnProperty(component, 'config', 'get').and.callThrough();

    expect(typeof component.config).toBe('undefined');
  });
});
