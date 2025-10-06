import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { HttpLoggingInterceptor } from './interceptors/http-logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([
        (req, next) =>
          new HttpLoggingInterceptor().intercept(req, { handle: next }),
      ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: false, // Deaktiviert Ripple-Animationen
    }),
  ],
};
