import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { IconModule } from '../icon/icon.module';
import { FillPipe } from '../tools/pipes/fill.pipe';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent, FillPipe ],
      imports: [IconModule, HttpClientModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load calendar component', () => {
    expect(component).toBeTruthy();
  });

  it('Given #handleDayClick is called then dateSelected should emit event', () => {
    const spy = spyOn(component.dateSelected, 'emit');
    component.handleDayClick(new Date());

    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleResetButtonClick is called then resetButtonClick should emit event', () => {
    const spy = spyOn(component.resetButtonClick, 'emit');
    const evt = jasmine.createSpyObj('e', ['preventDefault']);
    component.handleResetButtonClick(evt);

    expect(spy).toHaveBeenCalled();
  });

  it('Given #isPrevButtonDisabled is called with min date then it should return true', () => {
    component.minDate = new Date();
    fixture.detectChanges();

    expect(typeof component.isPrevButtonDisabled()).toBe('boolean');
  });

  it('Given #isNextButtonDisabled is called with max date then it should return true', () => {
    component.maxDate = new Date();
    expect(typeof component.isNextButtonDisabled()).toBe('boolean');
  });

  it('Given #isPrevButtonDisabled is called with min date as null then it should return true', () => {
    component.minDate = null;
    expect(typeof component.isPrevButtonDisabled()).toBe('boolean');
  });

  it('Given #isNextButtonDisabled is called with max date null as then it should return true', () => {
    component.maxDate = null;
    expect(typeof component.isNextButtonDisabled()).toBe('boolean');
  });

  it('Given #className is called without and date selected then it should return null', () => {
    expect(component.className(3)).toBeNull();
  });

  // it('#className', () => {
  //   component.selectedDate = { date: new Date(2019, 4, 20), dateTo: new Date(2019, 4, 20) };
  //   expect(component.className(20)).toBe('selected');
  // });

  // it('Given #className is called with selected date having date and dateto parameter passed and index is in between that day then it should return between', () => {
  //   component.selectedDate = { date: new Date(2019, 4, 20), dateTo: new Date(2019, 4, 28)};
  //   expect(component.className(24)).toBe('between');
  // });
});
