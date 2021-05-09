import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Subscription } from 'rxjs';
import { VERSION } from '../environments/version';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'nni-velocity-app-onboarding';

  subscriptions: Subscription[] = [];
  version = `${VERSION.version}+sha.${VERSION.sha}`;

  constructor(public authService: AuthenticationService, matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIcon('log_out', domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/log_out.svg'));
  }

  isAuthenticated(): boolean {
    return this.authService.isUserAuthenticated();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
