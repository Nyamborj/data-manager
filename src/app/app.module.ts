import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { MyDataModule } from 'my-data';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ModalModule } from './modules';
import { ModalBoxComponent } from './modules/modal/components';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyDataModule.withMetaReducers(metaReducers),
    StoreDevtoolsModule.instrument({}),
    HttpClientModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalBoxComponent]
})
export class AppModule { }
