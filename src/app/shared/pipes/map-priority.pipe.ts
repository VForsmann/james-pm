import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapPriority'
})
export class MapPriorityPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value === '1') { return 'High'; }
    if (value === '2') { return 'Medium'; }
    if (value === '3') { return 'Low'; }
    return null;
  }
}
