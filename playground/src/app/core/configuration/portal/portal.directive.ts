import {
  ComponentFactoryResolver, ComponentRef,
  ContentChild,
  Directive, ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit, Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { BasePortalHost, ComponentPortal, Portal, TemplatePortal } from './portal';
import { PortalService } from './portal.service';

/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 *
 * Usage:
 * <template wfcPortal #greeting>
 *   <p> Hello {{name}} </p>
 * </template>
 */
@Directive({
  selector: '[wfcPortal]'
})
export class TemplatePortalDirective extends TemplatePortal {
  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}

/**
 * Directive version of a PortalHost. Because the directive *is* a PortalHost, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <template [wfcPortalHost]="greeting"></template>
 */
@Directive({
  selector: '[wfcPortalHost]'
})
export class PortalHostDirective extends BasePortalHost implements OnInit, OnDestroy {

  /** The attached portal. */
  private _portal: Portal<any>;

  @ContentChild('container', { read: ViewContainerRef, static: false })
  viewRealContainer: ViewContainerRef;

  /** Portal is marked as global. */
  @Input()
  global: boolean;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _viewContainerRef: ViewContainerRef,
              private _injector: Injector,
              private _portalService: PortalService,
              private _elementRef: ElementRef,
              private _renderer: Renderer2) {
    super();
  }

  /** Portal associated with the Portal host. */
  get portal(): Portal<any> {
    return this._portal;
  }

  set portal(p: Portal<any>) {
    if (p) {
      this._replaceAttachedPortal(p);
    }
  }

  ngOnInit() {

    if (this.global) {

      if (this._portalService.isAttached()) {
        throw new Error('You can only have one global GlobalPortalHost on the page');
      }

      this._portalService.registerViewContainerRefAndInjector(this,
        this.viewRealContainer ? this.viewRealContainer : this._viewContainerRef, this._injector);

      this._renderer.addClass(this._elementRef.nativeElement, 'portal');
    }
  }

  ngOnDestroy() {
    this.dispose();
  }


  /**
   * Attach the given ComponentPortal to this PortalHost using the ComponentFactoryResolver.
   *
   * @param portal Portal to be attached to the portal host.
   */
  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {

    portal.setAttachedHost(this);

    // If the portal specifies an origin, use that as the logical location of the component
    // in the application tree. Otherwise use the location of this PortalHost.
    let viewContainerRef = portal.viewContainerRef != null ? portal.viewContainerRef : this._viewContainerRef;

    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);

    let ref = viewContainerRef.createComponent(
      componentFactory, viewContainerRef.length,
      portal.injector || viewContainerRef.parentInjector);

    this.setDisposeFn(() => ref.destroy());

    return ref;
  }

  /**
   * Attach the given TemplatePortal to this PortalHost as an embedded View.
   * @param portal Portal to be attached.
   */
  attachTemplatePortal(portal: TemplatePortal): Map<string, any> {
    portal.setAttachedHost(this);

    this._viewContainerRef.createEmbeddedView(portal.templateRef);
    this.setDisposeFn(() => this._viewContainerRef.clear());

    return new Map<string, any>();
  }

  /** Detaches the currently attached Portal (if there is one) and attaches the given Portal. */
  private _replaceAttachedPortal(p: Portal<any>) {

    if (this.hasAttached()) {
      this.detach();
    }

    if (p) {
      this.attach(p);
      this._portal = p;
    }
  }
}
