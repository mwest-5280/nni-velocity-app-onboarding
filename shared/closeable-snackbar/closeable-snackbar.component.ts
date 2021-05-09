/* eslint-disable */
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-closeable-snackbar',
  templateUrl: './closeable-snackbar.component.html'
})
export class CloseableSnackbarComponent {
  constructor(public ref: MatSnackBarRef<CloseableSnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
