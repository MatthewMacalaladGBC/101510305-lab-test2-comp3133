import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseColour',
})
export class HouseColourPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
