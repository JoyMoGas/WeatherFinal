import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinCelsius',
  standalone: true
})
export class KelvinCelsiusPipe implements PipeTransform {
  transform(kelvin: number, decimals: number = 1): string {
    const celsius = kelvin - 273.15;
    return `${celsius.toFixed(decimals)}°C`;
  }
}
