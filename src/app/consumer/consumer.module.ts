import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerComponent } from './consumer.component';


@NgModule({
  declarations: [ConsumerComponent],
  imports: [
    CommonModule
  ],
  exports: [ConsumerComponent]
})
export class ConsumerModule { }
