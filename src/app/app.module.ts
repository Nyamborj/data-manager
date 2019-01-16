import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { MyDataModule } from 'my-data';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ModalModule } from './modules';
import { ModalBoxComponent } from './modules/modal/components';
import { CustomTranslateHttpLoader } from './services/custom-translate-http-loader';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

  // AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyDataModule.withMetaReducers(metaReducers),
    StoreDevtoolsModule.instrument({}),
    HttpClientModule,
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
  entryComponents: [ModalBoxComponent]
})
export class AppModule { }
