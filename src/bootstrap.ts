import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // ou onde estiver seu array de rotas
import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
  ],
});
