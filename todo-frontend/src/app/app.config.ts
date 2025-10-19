import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import MyPreset from './mypreset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    MessageService, // Global MessageService
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: false,
        },
      },
      ripple: false, // Deaktiviert Ripple-Animationen
    }),
  ],
};
