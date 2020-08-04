import { Pipe, PipeTransform, ElementRef } from '@angular/core';
import { Iattributes } from '../models/menu';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: Iattributes[], value: string, el?): string {
    const targetAttr = arr.filter((at: Iattributes) => at.attributeID === value)[0].attributeValue;
    if (el) { el.innerHTML = targetAttr; }
    return targetAttr;
  }

}
