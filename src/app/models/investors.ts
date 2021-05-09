export interface Address {
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  isPrimary: boolean;
  isValid: boolean;
  isMailing: boolean;
}

export interface Phone {
  phoneNumber: string;
  isPrimary: boolean;
  borrowerId: string;
  createdBy: string;
  isValid: boolean;
}

export interface EmailAddress {
  emailAddress: string;
  isPrimary: boolean;
  isValid: boolean;
}

export interface IInvestor {
  shortName: string;
  name: string;
  contactName: string;
  addresses: Address[];
  phoneNumbers: Phone[];
  phoneNumbersCreatedDate: string;
  emailAddresses: EmailAddress[];
  emailAddressesCreatedDate: string;
  websiteUrl: string;
  lenderId: string;
  investorId: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
  tenantId: string;
  servicerId: string;
  externalReferenceId: string;
  identifierNumber: string;
}

export interface IBankProfile {
  bankProfileId: string;
  borrowerId: string;
  tenantId: number;
  servicerId: number;
  bankProfileName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  createdDate: Date;
  updatedDate: Date;
}
