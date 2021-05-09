import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from '../../../environments/environment';
import moment from 'moment';
import { IdleAndTokenWarningModalComponent } from './idle-token-warning-modal/idle-token-warning-modal.component';
import { TimeoutTypeEnum } from './idle-token-timeout.enum';

@Injectable({
  providedIn: 'root'
})
export class IdleTokenService {
  private idleDialogRef: MatDialogRef<IdleAndTokenWarningModalComponent>;

  // a flag that is used internally to activate or deactivate the idle watcher
  private idleTimerActive: boolean;
  private tokenExpirationShown: boolean;
  private idleDuration: number;
  private idleDurationInterval: any;
  private tokenExpirationWarning: Date;
  private tokenExpires: Date;
  private tokenExpirationWarnSeconds = environment.tokenExpiringWarnMs ? environment.tokenExpiringWarnMs / 1000 : 60;
  private tokenExpirationBufferSeconds = environment.tokenTimeoutBufferMs
    ? environment.tokenTimeoutBufferMs / 1000
    : 20;

  constructor(private dialogService: MatDialog, private authService: AuthenticationService) {
    this.idleDuration = 0;
    this.idleTimerActive = false;
  }

  public getIsActive(): boolean {
    return this.idleTimerActive;
  }

  public getIdleDuration(): number {
    return this.idleDuration;
  }

  public getTokenExpiration(): Date {
    return this.tokenExpires;
  }

  public getTokenExpirationWarning(): Date {
    return this.tokenExpirationWarning;
  }

  public start() {
    this.idleTimerActive = true;
    this.idleDuration = 0;
    this.tokenExpirationWarning = moment(this.authService.retrieveAuthData().expires)
      .add(-(this.tokenExpirationWarnSeconds + this.tokenExpirationBufferSeconds), 's')
      .toDate();

    this.tokenExpires = moment(this.authService.retrieveAuthData().expires)
      .add(-this.tokenExpirationBufferSeconds, 's')
      .toDate();

    if (!this.idleDurationInterval) {
      this.idleDurationInterval = setInterval(() => {
        if (!this.idleTimerActive) {
          return;
        }
        this.idleDuration += 1;

        if (moment().toDate() > this.tokenExpires) {
          // Tokens are only good for an hour, force log out after the hour so the user gets a new token
          this.tokenExpirationShown = false;
          this.stop();
          this.authService.logout();
        } else if (moment().toDate() > this.tokenExpirationWarning) {
          if (!this.tokenExpirationShown) {
            this.tokenExpirationShown = true;
            this.showInactivityAndTokenModal(TimeoutTypeEnum.TOKEN);
          }
        }
      }, 1000);
    }
  }

  public onActivity() {
    if (!this.idleTimerActive) {
      return;
    }
    // reset the timer
    this.idleDuration = 0;
  }

  public stop() {
    this.idleTimerActive = false;
    this.idleDuration = 0;
    clearInterval(this.idleDurationInterval);
    this.idleDurationInterval = null;
  }

  public showInactivityAndTokenModal(isInactivityWarning) {
    this.stop();
    this.idleDialogRef = this.dialogService.open(IdleAndTokenWarningModalComponent, {
      // width: '250px',
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: false,
      data: {
        timeoutType: isInactivityWarning
      }
    });

    this.idleDialogRef.afterClosed().subscribe((continueSession: boolean) => {
      // undefined if they clicked the backdrop or hit escape
      if (continueSession === true || typeof continueSession === 'undefined') {
        this.start();
        this.onActivity();
      } else {
        this.tokenExpirationShown = false;
        this.stop();
        this.authService.logout();
      }
    });
  }
}
