import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatMomentDateModule,
  ],
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatCheckboxModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'L', 'LL'],
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    // TODO: Review MatDialog use to try and remove these next two dialog related providers,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class MaterialModule {}
