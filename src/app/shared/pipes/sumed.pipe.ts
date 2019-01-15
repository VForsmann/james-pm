import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumed',
  pure: false
})
export class SumedPipe implements PipeTransform {

  transform(value: any, backlogLength): any {
    const array = [];
    let sum = 0;
    if (value) {
      const length = value.length / backlogLength;
      for (
        let i = 0;
        i < value.length;
        i++
      ) {
        if (i % (length) === 0 && i !== 0) {
          array.push(sum);
          sum = 0;
          sum += value[i].storyPoints;
        } else {
          sum += value[i].storyPoints;
        }
      }
    }
    array.push(sum);
    return array;
  }

}
