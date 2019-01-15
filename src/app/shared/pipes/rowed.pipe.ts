import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rowed',
  pure: false
})
export class RowedPipe implements PipeTransform {
  transform(value: any, rowNumber: any, backlogLength): any {
    const array = [];
    if (value && rowNumber >= 0) {
      for (
        let i = rowNumber * backlogLength;
        i < (rowNumber + 1) * backlogLength;
        i++
      ) {
        array.push(value[i]);
      }
    }
    return array;
  }
}
