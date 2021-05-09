import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {
  constructor(public el: ElementRef) {
    this.el.nativeElement.onkeypress = evt => {
      if (evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
      }
    };
  }
}
