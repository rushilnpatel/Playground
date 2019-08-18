import { HttpClientModule } from '@angular/common/http';
import { IconModule } from 'src/app/core/icon/icon.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInlineComponent } from './error-inline.component';

describe('ErrorInlineComponent', () => {
  let component: ErrorInlineComponent;
  let fixture: ComponentFixture<ErrorInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorInlineComponent ],
      imports: [IconModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Given #handleButtonClick function is invoked then it should emit buttonClick', () => {
    spyOn(component.buttonClick, 'emit');

    component.handleButtonClick();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });
});
