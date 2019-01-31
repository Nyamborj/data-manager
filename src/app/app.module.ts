import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { MyDataModule } from 'my-data';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ModalModule } from './modules';
import { ModalBoxComponent } from './modules/modal/components';
import { CustomTranslateHttpLoader } from './services/custom-translate-http-loader';
import { RatingInputComponent } from './components/rating-input/rating-input.component';
import { FormComponent } from './components/form/form.component';
import { OverlayComponent } from './components/modal/overlay-component';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

  // AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    RatingInputComponent,
    FormComponent,
    OverlayComponent
  ],
  imports: [
    BrowserModule,
    MyDataModule.withMetaReducers(metaReducers),
    StoreDevtoolsModule.instrument({}),
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      useDefaultLang: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalBoxComponent, OverlayComponent]
})
export class AppModule { }
