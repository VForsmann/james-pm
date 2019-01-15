import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(array: any, field: string, secondfield: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    if (!secondfield) {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
          return -1;
        } else if (a[field] > b[field]) {
          return 1;
        } else {
          return 0;
        }
      });
    } else {
      array.sort((a: any, b: any) => {
        if (a[field][secondfield] < b[field][secondfield]) {
          return -1;
        } else if (a[field][secondfield] > b[field][secondfield]) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    return array;
  }
}
