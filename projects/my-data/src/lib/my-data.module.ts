import { NgModule } from '@angular/core';
import { MetaReducer, META_REDUCERS, StoreModule } from '@ngrx/store';

import { MyDataComponent } from './my-data.component';
import { DataModule } from './data/index';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    DataModule
  ],
  declarations: [MyDataComponent],
  exports: [MyDataComponent]
})
export class MyDataModule { }
