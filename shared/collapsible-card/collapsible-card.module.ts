import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapsibleCardComponent } from './collapsible-card.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [CollapsibleCardComponent],
  exports: [CollapsibleCardComponent],
  imports: [CommonModule, MaterialModule]
})
export class CollapsibleCardModule {}
