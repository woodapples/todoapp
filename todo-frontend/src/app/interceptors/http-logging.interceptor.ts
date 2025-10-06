import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('🚀 HTTP Request:', {
      method: req.method,
      url: req.url,
      headers: req.headers.keys().reduce((acc, key) => {
        acc[key] = req.headers.get(key);
        return acc;
      }, {} as any),
      body: req.body,
    });

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            console.log('✅ HTTP Response:', {
              status: event.status,
              statusText: event.statusText,
              url: event.url,
              body: event.body,
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('❌ HTTP Error:', {
            status: error.status,
            statusText: error.statusText,
            url: error.url,
            message: error.message,
            error: error.error,
          });
        },
      })
    );
  }
}
