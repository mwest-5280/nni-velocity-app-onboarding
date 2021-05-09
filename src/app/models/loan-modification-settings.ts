export interface InterestRateReductionSettings {
  type: 'flat rate' | 'percentage';
  amount: number;
}

export interface PaymentAmountReductionSettings {
  type: 'dollar' | 'percentage' |  'fixed payment' ;
  amount: number;
}

export interface LoanModificationSetting {
  loanModificationSettingId: string;
  loanProgramId: string;
  description: string;
  isActive: boolean;
  interestRateReduction?: InterestRateReductionSettings;
  paymentAmountReduction?: PaymentAmountReductionSettings;
  isBackdatedAllowed: boolean;
  isTemporary: boolean;
  duration: number;
  bringLoanCurrent: boolean;
  reamRequired: 'start' | 'end' | 'both' | 'never';
  capInterest: boolean;
}
