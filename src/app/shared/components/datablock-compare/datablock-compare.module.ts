import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { DatablockCompareComponent } from './datablock-compare.component';
import { DataBlockDetailsModule } from '../DataBlockDetails';

@NgModule({
  declarations: [DatablockCompareComponent],
  imports: [CommonModule, MaterialModule, DataBlockDetailsModule],
  exports: [DatablockCompareComponent]
})
export class DataBlockCompareModule {}
