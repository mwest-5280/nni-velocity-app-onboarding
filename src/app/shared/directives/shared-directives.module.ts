import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatDateDirective } from './format-date.directive';
import { NumbersOnlyDirective } from './numbers-only.directive';

@NgModule({
  declarations: [FormatDateDirective, NumbersOnlyDirective],
  imports: [CommonModule],
  exports: [FormatDateDirective, NumbersOnlyDirective],
})
export class SharedDirectivesModule {}
