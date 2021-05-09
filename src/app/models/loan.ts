import { FrequencyEnum } from './loanPrograms';

export interface ILoan {
  loanId: string;
  loanNumber: string;
  loanNumberFormatted: string;
  tenantId: string;
  servicerId: string;
  borrowers: Borrower[];
  investors: Investor[];
  loanProgramId: string;
  lenderId: string;
  term: number;
  amount: number;
  interestRate: number;
  minInterestRate: number;
  maxInterestRate: number;
  margin: number;
  rateType: string;
  dueDay: number;
  disbursementDate: Date;
  firstPaymentDate: Date;
  status: StatusEnum;
  termFrequency: FrequencyEnum;
  externalReferenceId: string;
  onboardingId: string;
  customData: any;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
  isActive: boolean;
  isScraActive: boolean;
  isBankruptcyActive: boolean;
  isDeathActive: boolean;
  isDiabilityActive: boolean;
  originationFee: number;
  paymentScheduleType: PaymentScheduleTypeEnum;
  paymentAmount: number;
}

export interface Borrower {
  borrowerId: string;
  borrowerType: BorrowerTypeEnum;
}

export enum BorrowerTypeEnum {
  BORROWER = 'borrower',
  COBORROWER = 'co-borrower'
}

export interface Investor {
  investorId: string;
}

export interface StatusEnum {
  CHARGEOFF: 'charge off';
  DEFAULT: 'default';
  FORBERANCE: 'forbearance';
  FRAUD: 'fraud';
  PAIDINFULL: 'paid in full';
  REJECTED: 'rejected';
  REPAYMENT: 'repayment';
  WRITEOFF: 'write off ';
}

export interface PaymentScheduleTypeEnum {
  FIXEDTERM: 'fixed term';
  FIXEDPAYMENT: 'fixed payment';
}
