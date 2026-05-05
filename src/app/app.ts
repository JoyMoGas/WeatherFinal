import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from './services/weather.service';
import { CurrentWeather, DayForecast } from './models/weather.models';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { ForecastGridComponent } from './components/forecast-grid/forecast-grid.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    CurrentWeatherComponent,
    ForecastGridComponent,
    SearchHistoryComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'Travel Weather Widget';

  currentWeather: CurrentWeather | null = null;
  forecast: DayForecast[] = [];
  
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);
  
  private weatherService = inject(WeatherService);
  history$ = this.weatherService.history$;

  private destroy$ = new Subject<void>();

  onSearch(city: string): void {
    if (!city) return;

    this.loading$.next(true);
    this.error$.next(null);
    this.currentWeather = null;
    this.forecast = [];

    // Save to history immediately
    this.weatherService.addToHistory(city);

    // Fetch current weather
    this.weatherService.getCurrentWeather(city)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (weather) => {
          this.currentWeather = weather;
          this.checkLoadingComplete();
        },
        error: (err) => {
          this.error$.next(err.message);
          this.loading$.next(false);
        }
      });

    // Fetch forecast
    this.weatherService.getForecast(city)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (forecastData) => {
          this.forecast = forecastData;
          this.checkLoadingComplete();
        },
        error: (err) => {
          // Si current weather falla ya mostramos el error
          // Si solo falla forecast lo podemos ignorar o manejar aca
          console.error('Error al cargar pronostico:', err);
          this.checkLoadingComplete();
        }
      });
  }

  private checkLoadingComplete(): void {
    // Basic completion check. A more robust way would be forkJoin but keeping it simple with Observables.
    // If either finishes, we can just hide the spinner if both aren't strictly required or if error happened.
    // Para simplificar, quitamos el loading asumiendo que al menos uno termino
    this.loading$.next(false);
  }

  get weatherTheme(): string {
    if (!this.currentWeather || !this.currentWeather.weather || this.currentWeather.weather.length === 0) {
      return 'theme-default';
    }
    
    const condition = this.currentWeather.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear':
        return 'theme-clear';
      case 'clouds':
        return 'theme-clouds';
      case 'rain':
      case 'drizzle':
        return 'theme-rain';
      case 'thunderstorm':
        return 'theme-thunderstorm';
      case 'snow':
        return 'theme-snow';
      default:
        return 'theme-default';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
