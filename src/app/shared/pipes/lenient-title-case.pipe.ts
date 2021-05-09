import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

const LENIENT_WORDS = ['of', 'to'];

@Pipe({
  name: 'lenientTitleCase',
})
export class LenientTitleCasePipe implements PipeTransform {
  private titleCasePipe = new TitleCasePipe();

  transform(value: string): string {
    return value
      .split(' ')
      .map((word, index) => {
        // The first word is always title case, otherwise be lenient of subsequent words by leaving them as-is.
        // TODO: Consider adding case where the last work is always capitalized too similar to the index 0 case.
        if (index === 0 || !LENIENT_WORDS.includes(word.toLocaleLowerCase())) {
          return this.titleCasePipe.transform(word);
        }
        return word;
      })
      .join(' ');
  }
}
