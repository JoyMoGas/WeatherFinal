import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const start = Date.now();
  console.log(`[HTTP] ${req.method} ${req.url}`);
  return next(req).pipe(
    tap({
      next: () => {
        const elapsed = Date.now() - start;
        console.log(`[HTTP] ${req.method} ${req.url} - ${elapsed}ms`);
      },
      error: (err) => {
        const elapsed = Date.now() - start;
        console.error(`[HTTP] ${req.method} ${req.url} - ERROR ${err.status} (${elapsed}ms)`);
      }
    })
  );
};
