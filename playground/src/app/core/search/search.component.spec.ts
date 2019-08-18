import { HttpClientModule } from '@angular/common/http';
import { IconModule } from './../icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [IconModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Given that all dpenedencies are there then Menu item component should load', () => {
    expect(component).toBeTruthy();
  });

  it('Given that #toggle function is called then open property should update to true if false already', () => {
    component.toggle();
    expect(component.classOpen).toBeTruthy();
  });

  it('Given user start typing in search input then #handleKeyup function should invoke', () => {
    spyOn(component.searchTextChange, 'emit');

    component.handleKeyup();

    expect(component.searchTextChange.emit).toHaveBeenCalled();
  });

  it('Given user clicked on search box then should call #handleClick function and should call toggle to update open property', () => {
    spyOn(component, 'toggle');
    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    component.handleClick(evt);

    expect(component.toggle).toHaveBeenCalled();
  });
  it('Given that search is having focus then #handleFocus should be called and set classFocus as true', () => {
    component.handleFocus();
    expect(component.classFocus).toBeTruthy();
  });
  it('Given that focus from search is removed then #handleBlur should be called and set classFocus as false', () => {
    component.handleBlur();
    expect(component.classFocus).toBeFalsy();
  });

  it('Given #reset function is invoked then it should emit searchTextChange', () => {
    spyOn(component.searchTextChange, 'emit');

    component.reset();

    expect(component.searchTextChange.emit).toHaveBeenCalled();
  });
});
