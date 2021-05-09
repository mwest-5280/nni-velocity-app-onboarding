import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { AutoDebitDetailsComponent } from './auto-debit-details/auto-debit-details.component';
import { BorrowerDetailsComponent } from './borrower-details/borrower-details.component';
import { CallTrackingSummaryComponent } from './call-tracking-summary/call-tracking-summary.component';
import { CurrentDeliquencyDialerBucketComponent } from './current-deliquency-dialer-bucket/current-deliquency-dialer-bucket.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ScheduledPaymentDetailsComponent } from './scheduled-payment-details/scheduled-payment-details.component';
import { SchoolEnrollmentDetailsComponent } from './school-enrollment-details/school-enrollment-details.component';
import { StatementDetailsComponent } from './statement-details/statement-details.component';
import { ScraDenialDetailsComponent } from './scra-denial-details/scra-denial-details.component';
import { ScraEndingDetailsComponent } from './scra-ending-details/scra-ending-details.component';

@NgModule({
  declarations: [
    AutoDebitDetailsComponent,
    BorrowerDetailsComponent,
    CallTrackingSummaryComponent,
    CurrentDeliquencyDialerBucketComponent,
    LoanDetailsComponent,
    PaymentDetailsComponent,
    ScheduledPaymentDetailsComponent,
    SchoolEnrollmentDetailsComponent,
    StatementDetailsComponent,
    ScraDenialDetailsComponent,
    ScraEndingDetailsComponent
  ],
  exports: [
    AutoDebitDetailsComponent,
    BorrowerDetailsComponent,
    CallTrackingSummaryComponent,
    CurrentDeliquencyDialerBucketComponent,
    LoanDetailsComponent,
    PaymentDetailsComponent,
    ScheduledPaymentDetailsComponent,
    SchoolEnrollmentDetailsComponent,
    StatementDetailsComponent,
    ScraDenialDetailsComponent,
    ScraEndingDetailsComponent
  ],
  imports: [CommonModule, MaterialModule]
})
export class DataBlockDetailsModule {}
