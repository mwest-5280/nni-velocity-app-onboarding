import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberMask',
})
export class NumberMaskPipe implements PipeTransform {
  private static parseIntWithDefault(numberString: string, defaultValue: number): number {
    const parsed = parseInt(numberString, 10);
    return isNaN(parsed) ? defaultValue : Math.abs(parsed);
  }

  transform(longNumber: string, digitsToShow?: string, maxLength?: string): string {
    const totalVisibleDigits = NumberMaskPipe.parseIntWithDefault(digitsToShow, 4);
    const totalLength = NumberMaskPipe.parseIntWithDefault(maxLength, 9);

    const visibleSection = longNumber.slice(-totalVisibleDigits);

    // Known issue: If the total length is less than the total visible digits this will not work
    return '*'.repeat(totalLength - totalVisibleDigits) + visibleSection;
  }
}
