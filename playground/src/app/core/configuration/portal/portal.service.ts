import { Compiler, ComponentRef, Injectable, Injector, ReflectiveInjector, ViewContainerRef } from '@angular/core';
import { PortalHostDirective } from './portal.directive';
import { Observable, ReplaySubject } from 'rxjs';
import { ComponentPortal } from './portal';

@Injectable({
  providedIn: 'root'
})
export class PortalService {

  portalHost: PortalHostDirective;

  /** Here we hold our placeholder */
  viewContainerRef: ViewContainerRef;

  /** Here we hold our injector */
  private _injector: Injector;

  /** We can use this to determine z-index of multiple modals */
  public activeInstances = 0;

  constructor(private compiler: Compiler) {
  }

  /** There is a global portal in the page */
  isAttached(): boolean {
    return !!this.viewContainerRef;
  }

  registerViewContainerRefAndInjector(postalHost: PortalHostDirective, viewContainerRef: ViewContainerRef, injector: Injector) {
    this.portalHost = postalHost;
    this.viewContainerRef = viewContainerRef;
    this._injector = injector;
  }

  create<T>(module: any, component: any, parameters?: Object): Observable<any> {

    if (!this.viewContainerRef)
      throw new Error('Must include a global GlobalPortalHost into the page');

    // we return a stream so we can  access the componentref
    let componentRef$ = new ReplaySubject();

    // compile the component based on its type and create a component factory
    this.compiler.compileModuleAndAllComponentsAsync(module).then(factory => {

      // look for the componentfactory in the modulefactory
      let componentFactory = factory.componentFactories.filter(item => item.componentType === component)[0];

      // the injector will be needed for DI in the custom component
      const childInjector = ReflectiveInjector.resolveAndCreate([], this._injector);

      // create the actual component
      let componentRef = this.viewContainerRef.createComponent(componentFactory, 0, childInjector);

      componentRef.instance.attach(this.portalHost);

      // pass the @Input parameters to the instance
      Object.assign(componentRef.instance, parameters);

      this.activeInstances++;

      // add a destroy method to the instance
      componentRef.instance['destroy'] = () => {
        this.activeInstances--;

        // this will destroy the component
        componentRef.destroy();
      };

      // the component is rendered into the ViewContainerRef so we can update and complete the stream
      componentRef$.next(componentRef);
      componentRef$.complete();
    });

    return componentRef$;
  }

  /**
   * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
   * @param portal Portal to be attached
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    return this.portalHost.attachComponentPortal(portal);
  }
}
