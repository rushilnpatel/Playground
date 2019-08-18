import { ComponentRef, ElementRef, Injector, TemplateRef, ViewContainerRef } from '@angular/core';
import {ComponentType} from './portal.types';

/**
 * A `Portal` is something that you want to render somewhere else.
 * It can be attach to / detached from a `PortalHost`.
 */
export abstract class Portal<T> {

  destroy: Function;

  private _attachedHost: PortalHost;

  /** Attach this portal to a host. */
  attach(host: PortalHost): T {

    if (host == null) {
      throw new Error('Attempting to attach a portal to a null PortalHost');
    }

    if (host.hasAttached()) {
      throw new Error('Host already has a portal attached');
    }

    this._attachedHost = host;

    return <T>host.attach(this);
  }

  /** Detach this portal from its host */
  detach() {

    let host = this._attachedHost;

    if (host == null) {
      throw new Error('Attempting to detach a portal that is not attached to a host');
    }

    this._attachedHost = null;

    if (this.destroy) {
      this.destroy();
    }

    return host.detach();
  }

  /** Whether this portal is attached to a host. */
  get isAttached(): boolean {
    return this._attachedHost != null;
  }

  // todo: move interface to data.types
  /**
   * Sets the PortalHost reference without performing `attach()`. This is used directly by
   * the PortalHost when it is performing an `attach()` or `detach()`.
   */
  setAttachedHost(host: PortalHost) {
    this._attachedHost = host;
  }
}

/**
 * A `ComponentPortal` is a portal that instantiates some Component upon attachment.
 */
export class ComponentPortal<T> extends Portal<ComponentRef<T>> {
  /** The type of the component that will be instantiated for attachment. */
  component: ComponentType<T>;

  /**
   * [Optional] Where the attached component should live in Angular's *logical* component tree.
   * This is different from where the component *renders*, which is determined by the PortalHost.
   * The origin necessary when the host is outside of the Angular application context.
   */
  viewContainerRef: ViewContainerRef;

  /** [Optional] Injector used for the instantiation of the component. */
  injector: Injector;

  constructor(
    component: ComponentType<T>,
    viewContainerRef: ViewContainerRef = null,
    injector: Injector = null) {
    super();
    this.component = component;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
  }
}

/**
 * A `TemplatePortal` is a portal that represents some embedded template (TemplateRef).
 */
export class TemplatePortal extends Portal<Map<string, any>> {
  /** The embedded template that will be used to instantiate an embedded View in the host. */
  templateRef: TemplateRef<any>;

  /** Reference to the ViewContainer into which the template will be stamped out. */
  viewContainerRef: ViewContainerRef;

  /**
   * Additional locals for the instantiated embedded view.
   * These locals can be seen as "exports" for the template, such as how ngFor has
   * index / event / odd.
   */
  locals: Map<string, any> = new Map<string, any>();

  constructor(template: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super();
    this.templateRef = template;
    this.viewContainerRef = viewContainerRef;
  }

  get origin(): ElementRef {
    return this.templateRef.elementRef;
  }

  attach(host: PortalHost, locals?: Map<string, any>): Map<string, any> {
    this.locals = locals == null ? new Map<string, any>() : locals;
    return super.attach(host);
  }

  detach() {
    this.locals = new Map<string, any>();
    return super.detach();
  }
}

/**
 * A `PortalHost` is an space that can contain a single `Portal`.
 */
export interface PortalHost {
  attach(portal: Portal<any>): any;

  detach(): any;

  dispose();

  hasAttached(): boolean;
}

/**
 * Partial implementation of PortalHost that only deals with attaching either a
 * ComponentPortal or a TemplatePortal.
 */
export abstract class BasePortalHost implements PortalHost {

  /** The portal currently attached to the host. */
  private _attachedPortal: Portal<any>;

  /** A function that will permanently dispose this host. */
  private _disposeFn: () => void;

  /** Whether this host has already been permanently disposed. */
  private _isDisposed = false;

  /** Whether this host has an attached portal. */
  hasAttached() {
    return this._attachedPortal != null;
  }

  attach(portal: Portal<any>): any {

    if (portal == null) {
      throw new Error('Must provide a portal to attach');
    }

    if (this.hasAttached()) {
      throw new Error('Host already has a portal attached');
    }

    if (this._isDisposed) {
      throw new Error('This PortalHost has already been disposed');
    }

    if (portal instanceof ComponentPortal) {
      this._attachedPortal = portal;
      return this.attachComponentPortal(portal);
    } else if (portal instanceof TemplatePortal) {
      this._attachedPortal = portal;
      return this.attachTemplatePortal(portal);
    } else {
      this._attachedPortal = portal;
    }
  }

  abstract attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;

  abstract attachTemplatePortal(portal: TemplatePortal): Map<string, any>;

  detach() {

    if (this._attachedPortal) {
      this._attachedPortal.setAttachedHost(null);
    }

    this._attachedPortal = null;

    if (this._disposeFn != null) {
      this._disposeFn();
      this._disposeFn = null;
    }
  }

  dispose() {
    if (this.hasAttached()) {
      this.detach();
    }

    this._isDisposed = true;
  }

  setDisposeFn(fn: () => void) {
    this._disposeFn = fn;
  }
}
