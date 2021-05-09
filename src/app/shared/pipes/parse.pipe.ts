import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'parse',
})
export class ParsePipe implements PipeTransform {
  transform(nonStandardDateString: string, format: string): any {
    const date = moment(nonStandardDateString, format);
    if (date.isValid()) {
      return date.toISOString();
    }
    return nonStandardDateString;
  }
}
