import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floatnum'
})
export class FloatnumPipe implements PipeTransform {

  transform(value) {
    return value.toFixed(2);
  }

}
