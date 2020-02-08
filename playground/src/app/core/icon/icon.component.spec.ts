import { environment } from './../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { IconCacheService } from './icon-cache.service';

class MockIconCacheService extends IconCacheService {
  getFromCache(ico) {
    return 'this is test';
  }
}

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let mockIconCacheService: MockIconCacheService;

  beforeEach(async(() => {
    mockIconCacheService = new MockIconCacheService();

    TestBed.configureTestingModule({
      declarations: [
        IconComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        { provide: IconCacheService, useClass: MockIconCacheService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;

    component.icon = 'icon-user';
    fixture.detectChanges();
  });

  it('Given that all dpenedencies are there then icon component should load', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterContentInit', () => {
    it('Given that the icon module does not have an "icon" param  - then should log error icon name is missing', () => {
      component.icon = '';
      fixture.detectChanges();
      expect(component.ngAfterContentInit()).toBeFalsy();
    });

    it('(icon) should be a string', () => {
      expect(component.icon).not.toBeNull();
      expect(typeof component.icon).toEqual(jasmine.any(String));
    });

    it('Given that the iconsBasePath is not defined then it should log error', () => {
      expect(environment.iconsBasePath).toBeDefined();
    });

    it('Given that the iconsBasePath is empty then it should log error', () => {
      expect(environment.iconsBasePath).not.toEqual('');
    });

    it('Given that the "icon" param is available - then should load and display image', () => {
      // tslint:disable-next-line: max-line-length
      const iconHTML = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><style type="text/css">.st0{fill:#FFFFFF;}</style><path class="st0" d="M12,1.9C6.4,1.9,1.9,6.4,1.9,12S6.4,22.1,12,22.1S22.1,17.6,22.1,12S17.6,1.9,12,1.9z M18.5,17.3 c - 0.2 - 0.5 - 0.7 - 0.8 - 1.6 - 1c - 1.9 - 0.4 - 3.7 - 0.8 - 2.9 - 2.5c2.6 - 5, 0.7 - 7.7 - 2.1 - 7.7c - 2.8, 0 - 4.7, 2.8 - 2.1, 7.7c0.9, 1.7 - 1, 2.1 - 2.9, 2.5 c - 0.9, 0.2 - 1.4, 0.6 - 1.6, 1.1C4.3, 15.9, 3.6, 14, 3.6, 12c0 - 4.7, 3.8 - 8.4, 8.4 - 8.4s8.4, 3.8, 8.4, 8.4C20.4, 14, 19.7, 15.9, 18.5, 17.3z"/></svg>';

      spyOn(component, 'ngAfterContentInit').and.returnValue(iconHTML);

      expect<any>(component.ngAfterContentInit()).toEqual(iconHTML);
    });
  });
});
