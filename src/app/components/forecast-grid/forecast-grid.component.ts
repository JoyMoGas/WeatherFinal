import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayForecast } from '../../models/weather.models';
import { KelvinCelsiusPipe } from '../../pipes/kelvin-celsius.pipe';

@Component({
  selector: 'app-forecast-grid',
  standalone: true,
  imports: [CommonModule, KelvinCelsiusPipe],
  templateUrl: './forecast-grid.component.html',
  styleUrls: ['./forecast-grid.component.css']
})
export class ForecastGridComponent {
  @Input() forecast: DayForecast[] = [];
  @Input() loading = false;

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
