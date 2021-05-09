import { Directive, ElementRef, OnDestroy } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';
import { createAutoCorrectedDatePipe } from 'text-mask-addons/dist/textMaskAddons';

@Directive({
  selector: '[appFormatDate]'
})
export class FormatDateDirective implements OnDestroy {
  static readonly mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // mm/dd/yyyy

  maskedInputController;

  constructor(private element: ElementRef) {
    const { mask } = FormatDateDirective;
    const { nativeElement: inputElement } = this.element;
    const pipe = createAutoCorrectedDatePipe('mm/dd/yyyy');

    // https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
    this.maskedInputController = textMask.maskInput({
      inputElement,
      mask,
      pipe
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }
}
