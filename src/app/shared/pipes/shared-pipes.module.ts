import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithDefaultPipe } from './with-default.pipe';
import { ParsePipe } from './parse.pipe';
import { NumberMaskPipe } from './number-mask.pipe';
import { FlagPipe } from './flag.pipe';
import { LenientTitleCasePipe } from './lenient-title-case.pipe';
import { FriendlyPercentPipe } from './friendly-percent.pipe';

@NgModule({
  declarations: [WithDefaultPipe, ParsePipe, NumberMaskPipe, FlagPipe, LenientTitleCasePipe, FriendlyPercentPipe],
  imports: [CommonModule],
  exports: [WithDefaultPipe, ParsePipe, NumberMaskPipe, FlagPipe, LenientTitleCasePipe, FriendlyPercentPipe],
})
export class SharedPipesModule {}
