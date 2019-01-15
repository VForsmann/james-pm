import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullSum',
  pure: false
})
export class FullSumPipe implements PipeTransform {

  transform(value: any): any {
    const array = [];
    const sum = [];
    if (value) {
      for (
        let i = 0;
        i < value.length;
        i++
      ) {
        array.push(value[i].storyPoints);
      }
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      sum.push(array.reduce(reducer));
    }
    return sum;
  }

}
