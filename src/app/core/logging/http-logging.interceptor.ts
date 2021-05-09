import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { MonoTypeOperatorFunction, Observable, OperatorFunction, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Logger } from './logger';

@Injectable()
export class HttpLoggingInterceptor implements HttpInterceptor {
  private readonly category = 'api-call';
  private readonly whitelist = [
    '/loggingapi',
    '/authapi',
    // can be partial or full urls
  ];
  private readonly errorWhitelist = {
    404: ['cellconsentapi/cellphoneconsent'],
  };

  constructor(private logger: Logger) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isWhitelisted(req.url)) {
      return next.handle(req);
    }

    const start = Date.now();
    let ok: string;

    const setSimpleStatus = tap(
      (event: HttpEvent<any>) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
      () => (ok = 'failed')
    );
    const logAndThrowError: OperatorFunction<HttpEvent<any>, HttpEvent<any>> = catchError((error) => {
      if (this.isWhitelistedError(error)) {
        this.logger.info(error, this.category);
      } else {
        this.logger.error(error, this.category);
      }
      return throwError(error);
    });
    const endTimerAndLogTrace: MonoTypeOperatorFunction<HttpEvent<any>> = finalize(() => {
      const elapsed = Date.now() - start;
      const message = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
      this.logger.trace(message, this.category);
    });

    return next.handle(req).pipe(setSimpleStatus, logAndThrowError, endTimerAndLogTrace);
  }

  private isWhitelisted(url) {
    return this.whitelist.some((white) => url.includes(white));
  }

  private isWhitelistedError({ status, url }: HttpErrorResponse) {
    if (this.errorWhitelist[status]) {
      return this.errorWhitelist[status].some((white) => url.includes(white));
    }
    return false;
  }
}
