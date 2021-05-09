export interface IEcoa {
  ecoaAgencyId: string;
  name: string;
  addresses: Address[];
  websiteUrl: string;
  phoneNumber: string;
  tollFreeNumber: string;
  servicerId: string;
  phoneNumberVerified: boolean;
  emailVerified: boolean;
  lenders: string[];
  groups: string[];
  createdDate: Date;
  updatedDate: Date;
}

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
