import { CalendarComponent } from './calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from 'src/app/core/icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarStreamComponent } from './calendar-stream.component';
import {FillPipe} from '../tools/pipes/fill.pipe';

describe('CalendarStreamComponent', () => {
  let component: CalendarStreamComponent;
  let fixture: ComponentFixture<CalendarStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarStreamComponent, FillPipe, CalendarComponent ],
      imports: [IconModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarStreamComponent);
    component = fixture.componentInstance;

    component.selectedDate = { date: new Date('2019/01/01'), dateTo: null };
    fixture.detectChanges();
  });

  it('should create CalendarStreamComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Given #handleCloseClick is called Then it should emit close function', () => {
    const spy = spyOn(component.close, 'emit');
    component.handleCloseClick();

    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleSelectDateButtonClick is called Then it should emit close function', () => {
    const spy = spyOn(component.selectDateButtonClick, 'emit');
    component.handleSelectDateButtonClick();

    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleResetButtonClick is called Then it should emit close function', () => {
    const spy = spyOn(component.resetButtonClick, 'emit');
    component.handleResetButtonClick();

    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleDateSelected is called and it doesnot have range selected Then it should set selectedDate with date only and dateTo should be null', () => {
    component.handleDateSelected(new Date('2019/02/02'));

    expect(typeof component.selectedDate.date).toBe('object');
    expect(component.selectedDate.dateTo).toBeNull();
  });

  it('Given #handleDateSelected is called and range is selected with date passed as param Then it should set selectedDate with date only and dateTo should be null', () => {
    component.rangeSelection = true;
    component.selectedDate = { date: new Date(2019, 4, 20), dateTo: new Date(2019, 4, 28) };

    fixture.detectChanges();
    component.handleDateSelected(new Date(2019, 4, 22));

    expect(typeof component.selectedDate.date).toBe('object');
    expect(component.selectedDate.dateTo).toBeNull();
  });

  it('Given #handleDateSelected is called and range is selected with date passed as less than selected date Then it should set selectedDate with dateTo and date both', () => {
    component.rangeSelection = true;
    component.selectedDate = { date: new Date(2019, 4, 20, 23, 2, 3), dateTo: null };

    fixture.detectChanges();
    component.handleDateSelected(new Date(2017, 2, 18, 22, 2, 3));

    expect(typeof component.selectedDate.date).toBe('object');
    expect(typeof component.selectedDate.dateTo).toBe('object');
  });

  it('Given #getAmountOfMonths is called without min and max date then function should return 12', () => {
    component.minDate = null;
    component.maxDate = null;
    fixture.detectChanges();
    expect(component.getAmountOfMonths()).toEqual(12);
  });

  it('Given #getAmountOfMonths is called with min date and max date is having difference of 1 month then it should return 1', () => {
    component.minDate = new Date(2019, 4, 20);
    component.maxDate = new Date(2019, 5, 25);
    fixture.detectChanges();
    expect(component.getAmountOfMonths()).toBeGreaterThan(0);
  });
});
