import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'withDefault'
})
export class WithDefaultPipe implements PipeTransform {
  transform(value: any, defaultValue: any): any {
    if (value === undefined || value === null) {
      return defaultValue;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return defaultValue;
    }
    return value;
  }
}
