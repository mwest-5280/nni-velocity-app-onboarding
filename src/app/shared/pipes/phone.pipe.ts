import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  transform(tel) {
    if (!tel) {
      return;
    }

    const value = tel.toString().trim().replace(/^\+/, '');

    if (value.match(/[^0-9]/)) {
      return tel;
    }

    let country;
    let city;
    let endNumber;

    switch (value.length) {
      case 10: // +1PPP####### -> C (PPP) ###-####
        country = 1;
        city = value.slice(0, 3);
        endNumber = value.slice(3);
        break;

      case 11: // +CPPP####### -> CCC (PP) ###-####
        country = value[0];
        city = value.slice(1, 4);
        endNumber = value.slice(4);
        break;

      case 12: // +CCCPP####### -> CCC (PP) ###-####
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        endNumber = value.slice(5);
        break;

      default:
        return tel;
    }

    endNumber = endNumber.slice(0, 3) + '-' + endNumber.slice(3);

    if (country === 1) {
      country = '';
    }

    return (country + ' (' + city + ') ' + endNumber).trim();
  }
}
