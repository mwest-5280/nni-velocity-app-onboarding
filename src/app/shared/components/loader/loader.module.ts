import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LoaderComponent]
})
export class LoaderModule {}
