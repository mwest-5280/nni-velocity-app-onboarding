import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { TimeoutTypeEnum } from '../idle-token-timeout.enum';

@Component({
  selector: 'app-idle-warning-modal',
  templateUrl: './idle-token-warning-modal.component.html',
  styleUrls: ['./idle-token-warning-modal.component.scss']
})
export class IdleAndTokenWarningModalComponent implements OnInit, OnDestroy {
  timeRemainingString: string;
  private elapsedMs = 0;
  private timeoutMs: number;
  private elapsedInterval;
  timeoutTypeEnum = TimeoutTypeEnum;
  timeoutType;

  constructor(
    public dialogRef: MatDialogRef<IdleAndTokenWarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.timeoutType = this.data.timeoutType;

    if (this.timeoutType === TimeoutTypeEnum.TOKEN) {
      this.timeoutMs = environment.tokenTimeoutWarnMs || 60000;
    }

    this.elapsedInterval = setInterval(() => {
      this.elapsedMs += 1000;
      this.updateTimeRemainingString();

      if (this.timeoutMs <= this.elapsedMs) {
        this.dialogRef.close(false);
      }
    }, 1000);
  }

  private updateTimeRemainingString() {
    const difference = this.timeoutMs - this.elapsedMs;
    if (difference > 3600000) {
      this.timeRemainingString = `${difference / 3600000} hours`;
    } else if (difference > 60000) {
      this.timeRemainingString = `${difference / 60000} minutes`;
    } else {
      this.timeRemainingString = `${difference / 1000} seconds`;
    }
  }

  onClickStay(): void {
    this.dialogRef.close(true);
  }

  onClickLogout(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    clearInterval(this.elapsedInterval);
  }
}
