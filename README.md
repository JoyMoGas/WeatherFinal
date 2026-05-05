# Travel Weather Widget

Aplicación de clima para viajeros construida con Angular. Permite consultar el clima actual y el pronóstico de 5 días para cualquier ciudad del mundo.

## Características

- Búsqueda de ciudades con autocompletado del historial
- Clima actual (temperatura, sensación térmica, humedad, viento)
- Pronóstico extendido de 5 días
- Historial de últimas 5 búsquedas
- Diseño "Glassmorphism" con colores azules
- Manejo de estados de carga y errores
- Consumo de API real (OpenWeatherMap)

## Conceptos Aplicados

- `HttpClientModule` y peticiones HTTP (GET)
- `Observable` y `async` pipe
- Manejo de errores con `catchError` y `throwError`
- Interceptors (logging básico de peticiones)
- Loading states y manejo de UI
- Custom Pipe para conversión de Kelvin a Celsius

## Capturas de Pantalla

### Búsqueda y Clima Actual
![Búsqueda de ciudad](docs/images/screenshot-search.png)
![Clima actual](docs/images/screenshot-current.png)

### Pronóstico y Historial
![Pronóstico de 5 días](docs/images/screenshot-forecast.png)
![Historial de búsquedas](docs/images/screenshot-history.png)

### Manejo de Errores
![Error de ciudad no encontrada](docs/images/screenshot-error.png)


## Ejecución del Proyecto

1. Abrir una terminal en el directorio del proyecto (`https://github.com/JoyMoGas/WeatherFinal.git`).
2. Instalar dependencias si no se han instalado:
   ```bash
   npm install
   ```
3. Ejecutar el servidor de desarrollo:
   ```bash
   ng serve
   ```
4. Abrir en el navegador: `http://localhost:4200`
