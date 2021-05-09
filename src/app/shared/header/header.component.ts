import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public username: string;
  showPrdBanner: boolean;
  showProceedBanner: boolean;
  envs = environment;
  isProdUAT: boolean;
  isQAProceed: boolean;

  constructor(private router: Router, public authService: AuthenticationService) {
    this.username = this.authService.getUsername();
    this.isQAProceed = this.authService.isnegativeQa();
    this.isProdUAT = this.authService.isProdUat();

    // depending on what environment we are in, we will show the environment bar
    if (this.envs.envName === 'prod' && this.isProdUAT) {
      this.showPrdBanner = true;
    }

    // here for proceed conversions so ppl can tell what they are logged into
    if (this.envs.envName === 'qa' && this.isQAProceed) {
      this.showProceedBanner = true;
    }
  }

  logout() {
    this.authService.logout();
  }

  changePassword(): void{
    this.router.navigate(['password']);
  }
}
