import {
  Injectable,
  Inject,
  OnInit,
  Injector,
  ComponentRef
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { OverlayComponent } from './overlay-component';

import { FilePreviewOverlayRef } from './overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './overlay-token';

export interface Image {
  name: string;
  url: string;
}

interface FilePreviewDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  image?: Image;
}

const DEFAULT_CONFIG: FilePreviewDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'tm-file-preview-dialog-panel',
  image: null
};

@Injectable({ providedIn: 'root' })
export class FilePreviewOverlayService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  public open(config: FilePreviewDialogConfig = {}): FilePreviewOverlayRef {
    // Override default configuration
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };

    // Returns an OverlayRef which is a PortalHost.
    const overlayRef = this.createOverlay(dialogConfig);

    // Instantiate remote control
    const dialogRef = new FilePreviewOverlayRef(overlayRef);

    this.attachDialogContainer(
      overlayRef,
      dialogConfig,
      dialogRef
    );

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: FilePreviewDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);

    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(
    overlayRef: OverlayRef,
    config: FilePreviewDialogConfig,
    dialogRef: FilePreviewOverlayRef
  ): any {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(
      OverlayComponent,
      null,
      injector
    );

    const containerRef: ComponentRef<OverlayComponent> = overlayRef.attach(
      containerPortal
    );

    return containerRef.instance;
  }

  private createInjector(
    config: FilePreviewDialogConfig,
    dialogRef: FilePreviewOverlayRef
  ): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(FilePreviewOverlayRef, dialogRef);
    injectionTokens.set(FILE_PREVIEW_DIALOG_DATA, config.image);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: FilePreviewDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
