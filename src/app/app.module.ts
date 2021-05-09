import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { BearerTokenInterceptor } from './security/bearer-token.interceptor';
import { LogoutUnauthorizedInterceptor } from './security/logout-unauthorized.interceptor';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { HttpLoggingInterceptor } from '../app/core/logging/http-logging.interceptor';
import { LoaderInterceptorService } from './shared/components/loader/loader.interceptor';
import { IdleTokenTimeoutModule } from './shared/idle-token-timeout/idle-token-timeout.module';
import { CloseableSnackbarComponent } from './shared/components/closeable-snackbar';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard, SkipIfAuthenticatedGuard } from './security';
import { DevAuthGuard } from './security/dev-auth.guard';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent, CloseableSnackbarComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    IdleTokenTimeoutModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({}),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    SkipIfAuthenticatedGuard,
    DevAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogoutUnauthorizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoggingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'USD' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
