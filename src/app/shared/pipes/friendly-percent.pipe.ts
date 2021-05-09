import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyPercent',
})
export class FriendlyPercentPipe implements PipeTransform {
  /**
   * Transforms a non-empty string or a number into its string representation with a percent suffix.
   * All other types are changed to a null value.
   *
   * Please note that this pipe does not perform number conversions but assumes the input is already
   * formatted as a "display percent" (e.g., 3.5 and not 0.035).
   *
   * @param value the value on which to append a percent sign.
   */
  transform(value: any): string | null {
    if ((typeof value === 'string' && value.trim() !== '') || typeof value === 'number') {
      // TODO: Consider checking string values for the presence of % and remove before returning the following.
      return value + '%';
    }
    return null;
  }
}
