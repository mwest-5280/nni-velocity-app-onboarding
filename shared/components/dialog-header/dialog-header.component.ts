import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-header',
  template: `
    <div matTooltip="Close" matTooltipPosition="below">
      <button mat-icon-button type="button" (click)="onCancelClick()">
        <mat-icon color="primary">cancel</mat-icon>
      </button>
    </div>

    <h3 mat-dialog-title>
      <ng-content></ng-content>
    </h3>
  `,
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent {
  @Input() closeValue: any;

  constructor(private dialogRef: MatDialogRef<DialogHeaderComponent>) {}

  onCancelClick() {
    if (this.closeValue) {
      this.dialogRef.close(this.closeValue);
    } else {
      this.dialogRef.close();
    }
  }
}
