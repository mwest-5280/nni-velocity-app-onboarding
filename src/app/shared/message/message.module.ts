import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { SimpleMessageComponent } from './simple-message.component';
import { MaterialModule } from './../material.module';

@NgModule({
  declarations: [MessageComponent, SimpleMessageComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MessageComponent, SimpleMessageComponent]
})
export class MessageModule {}
