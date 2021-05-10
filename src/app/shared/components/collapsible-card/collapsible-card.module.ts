import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleCardComponent } from './collapsible-card.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [CollapsibleCardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CollapsibleCardComponent]
})
export class CollapsibleCardModule {}
