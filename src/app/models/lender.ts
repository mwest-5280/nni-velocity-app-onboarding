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

export interface ILender {
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
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
  tenantId: string;
  servicerId: string;
  lenderNumber: string;
  brandInfo: BrandInfo;
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
  accountHolderFirstName: string;
  accountHolderLastName: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface BrandInfo {
  achName: string;
  achDescription: string;
  brandId: string;
  customData: CustomData;
}

// Custom Data is under Branding Information only
export interface CustomData {
  emailSettings: EmailSettings;
  logoWebsiteSettings: LogoWebsiteSettings;
  paymentMailingAddress: PaymentMailingAddress;
  correspondenceMailingAddress: CorrespondenceMailingAddress;
}
 export interface EmailSettings {
   fromEmail: string;
   fromName: string
 }
 export interface LogoWebsiteSettings {
   logoLink: any;
   logoImageLocation: string;
   websiteFAQ: string;
   faxNumber: string;
 }
 export interface PaymentMailingAddress {
   street1: string;
   street2: string;
   city: string;
   state: string;
   postalCode: string;
   countryCode: string;
   addressType: AddressType;
 }
 export interface CorrespondenceMailingAddress {
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  addressType: AddressType;
 }

 export enum AddressType {
  Correspondence = 'Correspondence',
  Payment = 'Payment'
}
