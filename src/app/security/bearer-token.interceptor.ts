import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from '../../environments/environment';

@Injectable()
export class BearerTokenInterceptor implements HttpInterceptor {
  private whitelist: string[];

  constructor(public auth: AuthenticationService) {
    this.whitelist = environment.authInterceptorWhitelist || [];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.urlIsWhitelisted(request.url)) {
      return next.handle(request);
    }
    const token = this.auth.getToken();
    if (!token) {
      return next.handle(request);
    }
    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    );
  }

  private urlIsWhitelisted(url: string): boolean {
    return this.whitelist.reduce((urlIsWhitelisted: boolean, whitelistedString: string) => {
      return urlIsWhitelisted || url.includes(whitelistedString);
    }, false);
  }
}
