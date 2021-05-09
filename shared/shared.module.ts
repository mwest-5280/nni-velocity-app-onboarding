import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxMaskModule } from 'ngx-mask';
import { HeaderComponent } from './header/header.component';
import { CollapsibleCardComponent } from './collapsible-card/collapsible-card.component';
import { CloseableSnackbarComponent } from './closeable-snackbar/closeable-snackbar.component';
import { DialogHeaderModule } from './components/dialog-header';
import { SharedPipesModule } from './pipes';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { FormatDateDirective } from './directives/format-date.directive';
import { MessageComponent } from './message/message.component';
import { SimpleMessageComponent } from './message/simple-message.component';
import { AutoDebitDetailsComponent } from './components/DataBlockDetails/auto-debit-details/auto-debit-details.component';
import { BorrowerDetailsComponent } from './components/DataBlockDetails/borrower-details/borrower-details.component';
import { CallTrackingSummaryComponent } from './components/DataBlockDetails/call-tracking-summary/call-tracking-summary.component';
import { CurrentDeliquencyDialerBucketComponent } from './components/DataBlockDetails/current-deliquency-dialer-bucket/current-deliquency-dialer-bucket.component';
import { LoanDetailsComponent } from './components/DataBlockDetails/loan-details/loan-details.component';
import { PaymentDetailsComponent } from './components/DataBlockDetails/payment-details/payment-details.component';
import { ScheduledPaymentDetailsComponent } from './components/DataBlockDetails/scheduled-payment-details/scheduled-payment-details.component';
import { ScraDenialDetailsComponent } from './components/DataBlockDetails/scra-denial-details/scra-denial-details.component';
import { StatementDetailsComponent } from './components/DataBlockDetails/statement-details/statement-details.component';
import { DatablockCompareComponent } from './components/datablock-compare/datablock-compare.component';
import { IdleTimeoutComponent } from './idle-token-timeout/idle-token-timeout.component';
import { IdleAndTokenWarningModalComponent } from './idle-token-timeout/idle-token-warning-modal/idle-token-warning-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SchoolEnrollmentDetailsComponent } from './components/DataBlockDetails/school-enrollment-details/school-enrollment-details.component';
import { ScraEndingDetailsComponent } from './components/DataBlockDetails/scra-ending-details/scra-ending-details.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    SharedPipesModule,
    DialogHeaderModule
  ],
  entryComponents: [CloseableSnackbarComponent],
  declarations: [
    HeaderComponent,
    CollapsibleCardComponent,
    MessageComponent,
    SimpleMessageComponent,
    CloseableSnackbarComponent,
    NumbersOnlyDirective,
    FormatDateDirective,
    CloseableSnackbarComponent,
    AutoDebitDetailsComponent,
    SchoolEnrollmentDetailsComponent,
    BorrowerDetailsComponent,
    CallTrackingSummaryComponent,
    CurrentDeliquencyDialerBucketComponent,
    LoanDetailsComponent,
    PaymentDetailsComponent,
    ScheduledPaymentDetailsComponent,
    ScraDenialDetailsComponent,
    StatementDetailsComponent,
    DatablockCompareComponent,
    IdleTimeoutComponent,
    IdleAndTokenWarningModalComponent,
    LoaderComponent,
    ScraEndingDetailsComponent
  ],
  exports: [
    HeaderComponent,
    CollapsibleCardComponent,
    MessageComponent,
    SimpleMessageComponent,
    CloseableSnackbarComponent,
    AutoDebitDetailsComponent,
    SchoolEnrollmentDetailsComponent,
    BorrowerDetailsComponent,
    CallTrackingSummaryComponent,
    CurrentDeliquencyDialerBucketComponent,
    LoanDetailsComponent,
    PaymentDetailsComponent,
    ScheduledPaymentDetailsComponent,
    ScraDenialDetailsComponent,
    StatementDetailsComponent,
    DatablockCompareComponent,
    IdleTimeoutComponent,
    IdleAndTokenWarningModalComponent,
    LoaderComponent,
    ScraEndingDetailsComponent
  ],
  providers: []
})
export class SharedModule {}
