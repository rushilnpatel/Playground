import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';


describe('CardValue Component: Display title and value for card ', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;

    component.title = 'Test';
    component.value = 12;
    fixture.detectChanges();
  });

  it('Given that all dpenedencies are there then Card Value component should load', () => {
    expect(component).toBeTruthy();
  });

  describe('Card data', () => {
    it('Given that title is a string then should populate card cell title', () => {
      const eleTitle = fixture.elementRef.nativeElement.children[0].innerText;

      expect(eleTitle).toBeDefined();

      expect(eleTitle).not.toBeNull();

      expect(eleTitle).not.toEqual('');

      expect(eleTitle).toEqual(jasmine.any(String));
      // ('CounterCompnent Title:' + eleTitle);
    });

    it('Given that value is a number and greater or equal to 0 then should populate card cell value', () => {
      const eleValue = fixture.elementRef.nativeElement.children[1].innerText;

      expect(eleValue).not.toBeNull();

      expect(eleValue).toBeGreaterThanOrEqual(0);

      // console.log('CounterCompnent value:' + eleValue);
    });

    it('Given that number is clicked then it should invoke onClick function', () => {
      const evt = jasmine.createSpyObj('e', ['preventDefault']);
      const spy = spyOn(component, 'onClick').and.callThrough();
      component.onClick(evt);

      expect(spy).toHaveBeenCalled();
    });
  });
});
