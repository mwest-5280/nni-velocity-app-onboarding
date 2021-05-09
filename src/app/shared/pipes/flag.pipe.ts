import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flag',
})
export class FlagPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Yes' : 'No';
  }
}
