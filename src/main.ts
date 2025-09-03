import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { ErrorInterceptor } from './app/interceptors/error-interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/interceptors/auth-interceptor';
import { LoadingInterceptor} from './app/interceptors/loading-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TimeAgoPipe } from 'time-ago-pipe';
//import { appConfig } from './app/app.config';
//import { importProvidersFrom } from '@angular/core';
//importProvidersFrom(HttpClientModule),
// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptors([
        AuthInterceptor, LoadingInterceptor, ErrorInterceptor
      ])
    ),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 2000,
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    BsModalService,
    BrowserModule,
  ]
}).catch(err => console.error(err));