import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckboxComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Given that all dpenedencies are there then Menu item component should load', () => {
    expect(component).toBeTruthy();
  });

  it('Given user clicked on checkbox then #handleChange function should invoke with change event', () => {
    spyOn(component.checkboxChange, 'emit');
    let evt: Event;
    evt = JSON.parse('{"isTrusted":true, "target": {"checked": false}}');

    component.handleChange(evt);

    expect(component.checkboxChange.emit).toHaveBeenCalled();
  });
});
