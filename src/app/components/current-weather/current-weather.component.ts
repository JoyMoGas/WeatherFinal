import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeather } from '../../models/weather.models';
import { KelvinCelsiusPipe } from '../../pipes/kelvin-celsius.pipe';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, KelvinCelsiusPipe],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent {
  @Input() weather: CurrentWeather | null = null;
  @Input() loading = false;
  @Input() error: string | null = null;

  getWeatherIcon(iconCode: string): string {
    const map: Record<string, string> = {
      '01d': 'fa-sun',
      '01n': 'fa-moon',
      '02d': 'fa-cloud-sun',
      '02n': 'fa-cloud-moon',
      '03d': 'fa-cloud',
      '03n': 'fa-cloud',
      '04d': 'fa-clouds',
      '04n': 'fa-clouds',
      '09d': 'fa-cloud-showers-heavy',
      '09n': 'fa-cloud-showers-heavy',
      '10d': 'fa-cloud-sun-rain',
      '10n': 'fa-cloud-moon-rain',
      '11d': 'fa-bolt',
      '11n': 'fa-bolt',
      '13d': 'fa-snowflake',
      '13n': 'fa-snowflake',
      '50d': 'fa-smog',
      '50n': 'fa-smog'
    };
    return map[iconCode] ?? 'fa-cloud';
  }
}
