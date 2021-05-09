import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import moment from 'moment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IdleTokenService } from '../../services/idle-token.service';
import { TimeoutTypeEnum } from './idle-token-timeout.enum';
import { Subscriptions } from '../subscriptions';

export enum KEY_CODE {
  SINGLE_QUOTE = 222,
  GRAVE = 'Backquote'
}
@Component({
  selector: 'app-idle-timeout',
  templateUrl: 'idle-token-timeout.component.html'
})
export class IdleTimeoutComponent implements OnInit, OnDestroy {
  public showIdleTimer = false;

  public lastActive: string;

  private subscriptions = new Subscriptions();

  constructor(private idleTokenService: IdleTokenService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.listenToRouterEvents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener('window:mousemove') onMouseMove() {
    this.onUserActivity();
  }

  @HostListener('window:keydown') onKeyDownAny() {
    this.onUserActivity();
  }

  @HostListener('window:keyup', ['$event']) onKeyUpDebug(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey && event.code === KEY_CODE.GRAVE) {
      this.showIdleTimer = !this.showIdleTimer;
    }
  }

  listenToRouterEvents() {
    this.subscriptions.add = this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const idleOffForRoute = this.route.root.firstChild.snapshot.data.idleOff;
      if (idleOffForRoute) {
        this.idleTokenService.stop();
      } else {
        this.idleTokenService.start();
      }
    });
  }

  onUserActivity() {
    this.lastActive = moment().format('HH:mm:ss:SSS a');
    this.idleTokenService.onActivity();
  }

  get idleSeconds(): number {
    return this.idleTokenService.getIdleDuration();
  }

  get tokenExpirationWarning(): string {
    const dateParts = this.idleTokenService
      .getTokenExpirationWarning()
      .toLocaleString()
      .split(' ');
    return dateParts[1];
  }

  get tokenExpires(): string {
    const dateParts = this.idleTokenService
      .getTokenExpiration()
      .toLocaleString()
      .split(' ');
    return dateParts[1];
  }

  getIsIdleActive() {
    return this.idleTokenService.getIsActive();
  }

  showIdleWarningNow() {
    this.idleTokenService.showInactivityAndTokenModal(TimeoutTypeEnum.INACTIVITY);
  }

  showTokenWarningNow() {
    this.idleTokenService.showInactivityAndTokenModal(TimeoutTypeEnum.TOKEN);
  }
}
