import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'houseColour',
  standalone: true
})
export class HouseColourPipe implements PipeTransform {
  transform(house: string): string {
    switch (house?.toLowerCase()) {
      case 'gryffindor': return '#7f0909';
      case 'slytherin':  return '#2a623d';
      case 'hufflepuff': return '#e1b033';
      case 'ravenclaw':  return '#222f5b';
      default:           return '#888888';
    }
  }
}
