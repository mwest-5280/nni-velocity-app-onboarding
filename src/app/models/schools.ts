export interface Schools {
  schoolId: string;
  schoolName: string;
  opeId: string;
  titleivEligibility: {
    eligible: true;
    effectiveDate: string;
  };
  schoolType: string;
  schoolCode: string;
  address: {
    street1: string;
    street2: string;
    city: string;
    state: string;
    postalCode: string;
  };
  contacts: Contact[];
  clearingHouse: true;
  customData: {};
}
export interface Contact {
  firstName: string;
  middleName: string;
  lastName: string;
  title: string;
  phoneNumbers: Phone[];
  emailAddresses: EmailAddress[];
  url: string;
}
export class Phone {
  phoneNumber: string;
  isPrimary: true;
  isMobile: true;
}
export class EmailAddress {
  emailAddress: string;
  isPrimary: true;
}
