import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithDefaultPipe } from './with-default.pipe';
import { NumberMaskPipe } from './number-mask.pipe';
import { FlagPipe } from './flag.pipe';

@NgModule({
  declarations: [WithDefaultPipe, NumberMaskPipe, FlagPipe],
  imports: [CommonModule],
  exports: [WithDefaultPipe, NumberMaskPipe, FlagPipe]
})
export class SharedPipesModule {}
