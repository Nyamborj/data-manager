import { NgModule, ModuleWithProviders } from '@angular/core';
import { MetaReducer, META_REDUCERS, StoreModule } from '@ngrx/store';

import { MyDataComponent } from './my-data.component';
import { DataModule } from './data/index';
import { ROOT_META_REDUCERS } from './injection-tokens/tokens';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    DataModule
  ],
  declarations: [MyDataComponent],
  exports: [MyDataComponent]
})
export class MyDataModule {
  public static withMetaReducers(
    rootMetaReducers: MetaReducer<any>[]
  ): ModuleWithProviders {

    return {
      ngModule: MyDataModule,
      providers: [
        {
          provide: ROOT_META_REDUCERS,
          useValue: rootMetaReducers || []
        }
      ]
    };
  }
}
