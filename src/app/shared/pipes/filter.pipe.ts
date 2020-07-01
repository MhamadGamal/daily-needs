import { Pipe, PipeTransform } from '@angular/core';
import { Iattributes } from '../models/menu';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: Iattributes[], value: string): string {
    return arr.filter((at: Iattributes) => at.attributeID === value)[0].attributeValue;
  }

}
