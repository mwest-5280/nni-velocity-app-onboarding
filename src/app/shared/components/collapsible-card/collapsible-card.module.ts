import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { CollapsibleCardComponent } from './collapsible-card.component';

@NgModule({
  declarations: [CollapsibleCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CollapsibleCardComponent]
})
export class CollapsibleCardModule {}
