// import { CalendarStreamComponent } from './../calendar/calendar-stream.component';
// import { CalendarComponent } from './../calendar/calendar.component';
import { WindowResizeService } from '../tools/window/window-resize.service';
// import { ComponentPortal, PortalHost } from '../configuration/portal/portal';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from '../calendar/calendar.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';
import { IconModule } from '../icon/icon.module';
import { PortalService } from '../configuration/portal/portal.service';
// import { ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { Observable } from 'rxjs';
import { auditTime } from 'rxjs/operators';
import { OverlayService } from '../overlay/overlay.service';
// import { OverlayComponent } from '../overlay/overlay.component';
// import { PortalHostDirective } from '../configuration/portal/portal.directive';
import { DatePipe } from '@angular/common';

class MockWindowResizeService extends WindowResizeService {
  constructor() {
    super(); // null is the http in service's constructor
  }
  windowResize(auditTimeInMs: number = 100): Observable<number> {
    if (auditTimeInMs === 0) {
      return this._resize.asObservable();
    }
    return this._resize.asObservable().pipe(auditTime(auditTimeInMs));
  }
}
// class MockPortalService extends PortalService {
//   constructor() {
//     super(null);
//   }
//   attachComponentPortal<T>(portal: ComponentPortal<T>) {
//     let porta;
//     porta = new CalendarStreamComponent();
//     return porta;
//   }
// }

class MockOverlayService extends OverlayService {
  constructor() {
    super(null);
  }

  // createOverlay () {
  //   let c = new OverlayComponent();
  //   let cmpFactoryResolver: ComponentFactoryResolver;
  //   c.portalHost = new PortalHostDirective(cmpFactoryResolver, null, null, null, null, null);

  //   return c;
  // }
}

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  // let mockPortalService: MockPortalService;
  let mockWindowResizeService;
  let mockOverlayService: MockOverlayService;

  beforeEach(async(() => {
    // mockPortalService = new MockPortalService();
    mockWindowResizeService = new MockWindowResizeService();
    mockOverlayService = new MockOverlayService();

    TestBed.configureTestingModule({
      declarations: [ DatePickerComponent ],
      imports: [CalendarModule, HttpClientModule, IconModule],
      providers: [
        PortalService,
        OverlayService,
        DatePipe,
        // { provide: PortalService, useClass: MockPortalService },
        { provide: OverlayService, useClass: MockOverlayService },
        { provide: WindowResizeService, useClass: MockWindowResizeService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    component.minDate = new Date();
    component.maxDate = new Date();
    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should load date picker component', () => {
    expect(component).toBeTruthy();
  });

  it('Given #open function is invoked then it should call _createAndShowCalendar function', () => {
    const spy = spyOn<any>(component, '_createAndShowCalendar');
    component.open();
    expect(spy).toHaveBeenCalled();
  });

  it('Given #close function is invoked then it should call _cleanUp function', () => {
    const spy = spyOn<any>(component, '_cleanUp');
    component.close();

    expect(spy).toHaveBeenCalled();
  });

  it('Given #handleDateFromClick function is invoked then it should call _createAndShowCalendar function', () => {
    const spy = spyOn<any>(component, '_createAndShowCalendar');
    // const spy2 = spyOn<any>(component, '_createAndShowRegularCalendar');
    component.handleDateFromClick();

    expect(spy).toHaveBeenCalled();
    // expect(spy2).toHaveBeenCalled();
  });

  it('Given #handleDateToClick function is invoked then it should call _createAndShowCalendar function', () => {
    const spy = spyOn<any>(component, '_createAndShowCalendar');
    component.handleDateToClick();

    expect(spy).toHaveBeenCalled();
  });

  it('Given minDate property is called then call should go to function', () => {
    const spy = spyOnProperty(component, 'minDate', 'get').and.returnValue('Mon Jan 01 2018 00:00:00 GMT-0500 (Eastern Standard Time)');

    expect(component.minDate).toBe('Mon Jan 01 2018 00:00:00 GMT-0500 (Eastern Standard Time)');
    expect(spy).toHaveBeenCalled();
  });

  it('Given minDate property is called then call should go to function and should return Date object', () => {
    const spy = spyOnProperty(component, 'minDate', 'get').and.callThrough();

    expect(typeof component.minDate).toBe('object');
    expect(spy).toHaveBeenCalled();
  });

  it('Given maxDate property is called then call should go to function', () => {
    const spy = spyOnProperty(component, 'maxDate', 'get').and.returnValue('Mon Jan 08 2018 00:00:00 GMT-0500 (Eastern Standard Time)');

    expect(component.maxDate).toBe('Mon Jan 08 2018 00:00:00 GMT-0500 (Eastern Standard Time)');
    expect(spy).toHaveBeenCalled();
  });

  it('Given maxDate property is called then call should go to function and should return Date object', () => {
    const spy = spyOnProperty(component, 'maxDate', 'get').and.callThrough();

    expect(typeof component.maxDate).toBe('object');
    expect(spy).toHaveBeenCalled();
  });
  it('Given #reset function is called then call should go to function and it should set selectedDate property as null', () => {
    component.reset();
    expect(component.selectedDate).toBeNull();
  });
});
