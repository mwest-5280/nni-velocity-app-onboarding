import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-closeable-snackbar',
  template: `
    <div class="d-flex flex-row justify-content-between align-items-center">
      <span>{{ data.message }}</span>
      <button mat-icon-button (click)="ref.dismiss()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `
})
export class CloseableSnackbarComponent {
  constructor(public ref: MatSnackBarRef<CloseableSnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
