import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChicletComponent } from './chiclet.component';
import { IconModule } from '../icon/icon.module';

describe('ChicletComponent', () => {
  let component: ChicletComponent;
  let fixture: ComponentFixture<ChicletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChicletComponent],
      imports: [HttpClientModule, IconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChicletComponent);
    component = fixture.componentInstance;
    component.data = JSON.parse('{"checked":true,"key":"vessel","value":"NORDIC AQUA/9800116","label":"Vessel #"}');
    fixture.detectChanges();
  });

  it('Given that all dpenedencies are there then Card Value component should load', () => {
    expect(component).toBeTruthy();
  });

  it('Given that number is clicked then it should invoke onClick function', () => {
    const spy = spyOn(component.remove, 'emit').and.callThrough();
    component.handleCloseClick();

    expect(spy).toHaveBeenCalled();
  });

  it('Given label property is called then call should go to function and return label', () => {
    const spy = spyOnProperty(component, 'label', 'get').and.callThrough();

    expect(typeof component.label).toEqual('string');
    expect(spy).toHaveBeenCalled();
  });

  it('Given key property is called then call should go to function and return key', () => {
    const spy = spyOnProperty(component, 'key', 'get').and.callThrough();

    expect(typeof component.key).toEqual('string');
    expect(spy).toHaveBeenCalled();
  });

  it('Given value property is called then call should go to function and return value', () => {
    const spy = spyOnProperty(component, 'value', 'get').and.callThrough();

    expect(typeof component.value).toEqual('string');
    expect(spy).toHaveBeenCalled();
  });
});
