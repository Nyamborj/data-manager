import {
  Injectable,
  Injector,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  ApplicationRef
} from '@angular/core';
import { ComponentRef } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private childComponentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  public appendComponentTo(parentId: string, childComponent: any, childConfig?: IChildConfig) {
    // Create a component reference from the component
    const childComponentRef = this.componentFactoryResolver
      .resolveComponentFactory(childComponent)
      .create(this.injector);

    // Attach the config to the child component such as inputs and outputs.
    this.attachConfig(childConfig, childComponentRef);

    this.childComponentRef = childComponentRef;

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(childComponentRef.hostView);

    // Get DOM element from component
    const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Append DOM element to the body
    document.getElementById(parentId).appendChild(childDomElem);
  }

  public removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }

  private attachConfig(config: IChildConfig, componentRef: any): void {
    // componentRef.instance['inputs'] = config.inputs;

    // TODO: Explore this some more.
    componentRef.instance.message = config.inputs['message'];
    componentRef.instance['outputs'] = config.outputs;
  }
}

interface IChildConfig {
  inputs: object;
  outputs: object;
}
