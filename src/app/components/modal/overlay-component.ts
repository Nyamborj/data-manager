import { Component, Input, Inject } from '@angular/core';

import { FilePreviewOverlayRef } from './overlay-ref';
import { FILE_PREVIEW_DIALOG_DATA } from './overlay-token';

@Component({
  selector: 'app-overlay',
  template: `
    <div class="overlay-content">
      <img [src]="image.url">
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      margin: 0;
      padding: 1em;
    }

    img {
      width: 100%;
      max-width: 500px;
      height: auto;
    }

    .overlay-content {
      padding: 1em;
    }
  `]
})
export class OverlayComponent {

  constructor(
    public dialogRef: FilePreviewOverlayRef,
    @Inject(FILE_PREVIEW_DIALOG_DATA) public image: any) { }
}
