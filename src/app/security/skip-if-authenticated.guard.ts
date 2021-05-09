import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class SkipIfAuthenticatedGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // if not authenticated, continue
    if (!this.auth.isUserAuthenticated()) {
      return true;
    }

    const continueUrl = route.queryParams.continue;
    if (continueUrl) {
      this.router.navigateByUrl(continueUrl);
      return false;
    }

    // if authenticated, try to go to the configured route instead
    if (route.data.continueToRoute) {
      this.router.navigate(route.data.continueToRoute);
      return false;
    }
    return true;
  }
}
