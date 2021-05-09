import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LogoutUnauthorizedInterceptor implements HttpInterceptor {
  private whitelist: string[];

  constructor(private auth: AuthenticationService) {
    this.whitelist = environment.authInterceptorWhitelist || [];
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.urlIsWhitelisted(request.url)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError(error => {
        const url = new URL(error.url);
        console.log(url);
        if (error.status === 401 && url.pathname !== '/lenderapi/lenders') {
          this.auth.logout();
        }
        return throwError(error);
      })
    );
  }

  private urlIsWhitelisted(url: string): boolean {
    return this.whitelist.reduce((urlIsWhitelisted: boolean, whitelistedString: string) => {
      return urlIsWhitelisted || url.includes(whitelistedString);
    }, false);
  }
}
