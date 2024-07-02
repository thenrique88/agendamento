import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpRequestInterceptor } from './shared/components/http-interceptor';
import { provideToastr } from 'ngx-toastr';

const maskConfig: Partial<IConfig> = {
  validation: true,
  keepCharacterPositions: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideToastr(), // Toastr providers
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    provideEnvironmentNgxMask(maskConfig),
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
  ]
};
