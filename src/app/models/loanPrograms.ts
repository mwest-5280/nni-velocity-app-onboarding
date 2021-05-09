export interface LoanProgram {
  loanProgramId: string;
  description: string;
  loanProgramNumber: string;
  paymentSettings: IPaymentSettings;
  forbearanceSettings: ForbearanceSettings;
  interestSettings: IInterestSettings;
  billingSettings: IBillingSettings;
  delinquencySettings: IDelinquencySettings[];
  feeSettings: IFeeSettings[];
  incentiveSettings: IIncentiveSettings[];
  createdDate: Date;
  updatedDate: Date;
  lenderId: string;
  lenderNumber: string;
  isActive: boolean;
  isBatchActive: boolean;
  coborrowerTypes: string;
  studentLoanSettings: StudenLoanSettings;
  reamortizationSettings: ReamortizationSettings;
  scraSettings : ScraSettings;
  customData: CustomData;
}
export interface ReamortizationSettings {
  frequency: ReamFrequencyEnum;
  frequencyDay: number;
  frequencyMonth: number;
}
export enum ReamFrequencyEnum {
  ANNUALLY = 'annually',
  QUARTERLY = 'quarterly',
  MONTHLY = 'monthly',
  DAILY = 'daily'
}
export interface CustomData {
  [key: string]: any;
}
export interface StudenLoanSettings {
  gracePeriod: {
    studentEnrollmentAllowed: boolean;
  };
}

export interface ScraSettings {
  scraPriorEndCommunicationDays: any;
}
export interface ForbearanceSettings {
  forbearanceSettingId: string;
  type: string;
  name: string;
  maxBillingCyclesAllowed: number;
  minBillingCyclesPerInstance: number;
  maxBillingCyclesPerInstance: number;
  bringLoanCurrent: boolean;
  reamRequired: boolean;
  capInterest: boolean;
  extendTerm: boolean;
  removeFees: boolean;
  cancelAutoDebit: boolean;
  incentives: ForbIncentives;
  autoDebit: string;
  onTimePayment: string;
  loanModifications: string;
  sendWarningWhenEnding: boolean;
  daysAdvanceWarningBeforeEnding: number;
}

export interface ForbIncentives {
  autoDebit: string;
  onTimePayment: string;
  loanModifications: string;
}

export interface IIncentiveSettings {
  autoDebitSettings: IAutoDebitSettings;
  onTimePaymentSettings: number;
}

export interface IAutoDebitSettings {
  amount: number;
}

export interface IFeeSettings {
  lateFeeSettings: ILateFeeSettings[];
  nsfFeeSettings: INsfFeeSettings[];
}

export interface INsfFeeSettings {
  graceDays: number;
  feeAmount: number;
  feeAmountType: FeeAmountEnum;
  feeProceedsType: FeeProceedsEnum;
  minimumFee: number;
  maximumFee: number;
}

export interface ILateFeeSettings {
  graceDays: number;
  feeAmount: number;
  feeAmountType: FeeAmountEnum;
  feeProceedsType: FeeProceedsEnum;
  minimumFee: number;
  maximumFee: number;
}

export enum FeeProceedsEnum {
  LENDER = 'lender',
  SERVICER = 'servicer',
  INVESTOR = 'investor'
}

export enum FeeAmountEnum {
  DOLLAR = 'dollar',
  PERCENTAGE = 'percentage',
  PERCENTPASTDUE = 'percentage of past due'
}

export interface IDelinquencySettings {
  letters: ILetterSettings[];
  calls: ICallSettings[];
  defaultDays: number;
}

export interface ICallSettings {
  dialerBuckets: IDialerBuckets[];
}

export interface IDialerBuckets {
  daysLateStart: number;
  daysLateEnd: number;
  attempts: number;
  contacts: number;
}

export interface ILetterSettings {
  daysLate: number;
}

export interface IBillingSettings {
  days: number;
  termFrequency: FrequencyEnum;
  isDueDateChangeAllowed: boolean;
}

export interface IInterestSettings {
  method: MethodEnum;
  frequency: FrequencyEnum;
}

export enum FrequencyEnum {
  MONTHLY = 'monthly',
  BIWEEKLY = 'bi-weekly',
  WEEKLY = 'weekly',
  QUARTERLY = 'quarterly'
}

export enum MethodEnum {
  ACTUAL = 'actual/actual',
  THIRTY = '30/360',
  ACTUAL365 = 'actual/365',
  ACTUAL36525 = 'acutual/365.25'
}

export interface IPaymentSettings {
  order: PaymentOrderEnum;
  feeOrder: FeeOrderEnum;
  agingDays: number;
  alwaysPullAutoDebit: boolean;
  minimumPaymentAmount: number;
  tolerance: ITolerance;
  dueDateAdvancement: IDueDateAdvancement;
  smallBalance: ISmallBalances;
}

export interface ISmallBalances {
  writeUpAmount: number;
  writeOffAmount: number;
}

export interface ITolerance {
  amount: number;
  amountType: AmountTypeEnum;
}

export interface IDueDateAdvancement {
  isUnlimited: boolean;
  numberOfBillingCycles: number;
}

export enum AmountTypeEnum {
  DOLLAR = 'dollar',
  PERCENTAGE = 'percentage'
}

export enum PaymentOrderEnum {
  FEES = 'fees',
  INTEREST = 'interest',
  PRINCIPAL = 'principal'
}
export enum FeeOrderEnum {
  LENDER = 'lender',
  SERVICER = 'servicer',
  INVESTOR = 'investor'
}
