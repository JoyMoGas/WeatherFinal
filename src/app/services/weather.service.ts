import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  CurrentWeather,
  DayForecast,
  ForecastResponse
} from '../models/weather.models';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly api = environment.apiBase;
  private readonly key = environment.apiKey;
  private readonly maxHistory = 5;

  private historySubject = new BehaviorSubject<string[]>(this.loadHistory());
  history$ = this.historySubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    const url = `${this.api}/weather?q=${encodeURIComponent(city)}&appid=${this.key}`;
    return this.http.get<CurrentWeather>(url).pipe(
      catchError(this.handleError)
    );
  }

  getForecast(city: string): Observable<DayForecast[]> {
    const url = `${this.api}/forecast?q=${encodeURIComponent(city)}&appid=${this.key}`;
    return this.http.get<ForecastResponse>(url).pipe(
      map(res => this.groupForecastByDay(res)),
      catchError(this.handleError)
    );
  }

  addToHistory(city: string): void {
    const current = this.historySubject.value;
    const filtered = current.filter(c => c.toLowerCase() !== city.toLowerCase());
    const updated = [city, ...filtered].slice(0, this.maxHistory);
    this.historySubject.next(updated);
    localStorage.setItem('weatherHistory', JSON.stringify(updated));
  }

  private loadHistory(): string[] {
    try {
      return JSON.parse(localStorage.getItem('weatherHistory') || '[]');
    } catch {
      return [];
    }
  }

  private groupForecastByDay(res: ForecastResponse): DayForecast[] {
    const days = new Map<string, DayForecast>();
    const today = new Date().toDateString();

    for (const item of res.list) {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (dateKey === today) continue;

      if (!days.has(dateKey)) {
        days.set(dateKey, {
          date,
          dayName: date.toLocaleDateString('es-MX', { weekday: 'long' }),
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          tempMin: item.main.temp_min,
          tempMax: item.main.temp_max
        });
      } else {
        const existing = days.get(dateKey)!;
        if (item.main.temp_min < existing.tempMin) existing.tempMin = item.main.temp_min;
        if (item.main.temp_max > existing.tempMax) existing.tempMax = item.main.temp_max;
      }

      if (days.size >= 5) break;
    }

    return Array.from(days.values());
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Error desconocido. Intenta mas tarde.';
    if (error.status === 0) {
      message = 'Sin conexion a Internet. Verifica tu red.';
    } else if (error.status === 404) {
      message = 'Ciudad no encontrada. Verifica el nombre e intenta de nuevo.';
    } else if (error.status === 401) {
      message = 'API Key invalida. Configura tu clave de OpenWeatherMap.';
    } else if (error.status >= 500) {
      message = 'Error del servidor. Intenta mas tarde.';
    }
    return throwError(() => new Error(message));
  }
}
