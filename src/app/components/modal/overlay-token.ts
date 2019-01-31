import { InjectionToken } from '@angular/core';

import { Image } from './overlay-service';

export const FILE_PREVIEW_DIALOG_DATA = new InjectionToken<Image>('FILE_PREVIEW_DIALOG_DATA');
