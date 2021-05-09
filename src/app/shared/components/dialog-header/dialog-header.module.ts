import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { DialogHeaderComponent } from './dialog-header.component';

@NgModule({
  declarations: [DialogHeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DialogHeaderComponent]
})
export class DialogHeaderModule {}
