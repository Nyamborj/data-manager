import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalBoxComponent } from './components';

@NgModule({
  declarations: [ModalBoxComponent],
  imports: [
    CommonModule
  ],
  exports: [ModalBoxComponent]
})
export class ModalModule { }
