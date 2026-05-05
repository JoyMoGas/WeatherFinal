export interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
}

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
}

export interface CurrentWeather {
  name: string;
  sys: { country: string };
  main: WeatherMain;
  weather: WeatherDescription[];
  wind: Wind;
  dt: number;
}

export interface ForecastItem {
  dt: number;
  dt_txt: string;
  main: WeatherMain;
  weather: WeatherDescription[];
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: { name: string; country: string };
}

export interface DayForecast {
  date: Date;
  dayName: string;
  icon: string;
  description: string;
  tempMin: number;
  tempMax: number;
}
