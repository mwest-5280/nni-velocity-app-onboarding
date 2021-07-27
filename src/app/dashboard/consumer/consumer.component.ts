import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
    FormControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
    State,
    Country,
    StateCountryEventService
} from 'src/app/services/state-country-event.service';

@Component({
    selector: 'app-consumer',
    templateUrl: './consumer.component.html',
    styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
    generalSettingsForm: FormGroup;
    borrowerForm: FormGroup;
    coBorrowerForm: FormGroup;
    loanForm: FormGroup;
    loanPeriodForm: FormGroup;
    fixedAmount: FormGroup;
    deferment: FormGroup;
    interestOnly: FormGroup;
    principalInterest: FormGroup;
    showAddressBorder = false;

    /* loan rate types */
    rateTypes = ['Fixed', 'Variable'];

    /* borrower Type */
    borrowerType = [];

    /* phone type */
    phoneType = ['home', 'work', 'other'];

    /* loan period types */
    loanPeriodType = ['fixedAmount', 'deferment', 'interestOnly', 'principalAndInterest'];
    paymentFrequency = ['weekly', 'bi-weekly', 'monthly', 'quarterly'];
    loanStatus = ['repayment', 'deferred'];

    /* variables to show/hide loan period forms */
    showFixedAmount = false;
    showDeferment = false;
    showInterestOnly = false;
    showprincipalAndInterest = false;

    /* address form things */
    isPrimary: { key: string; value: boolean }[] = [
        { key: 'Yes', value: true },
        { key: 'No', value: false }
    ];

    states$: Observable<State[]> = this.stateCountryService.states$;
    countries$: Observable<Country[]> = this.stateCountryService.usaOnly$;

    constructor(
        private fb: FormBuilder,
        private stateCountryService: StateCountryEventService
    ) {}

    ngOnInit() {
        this.generalSettingsForm = this.fb.group({
            loanProgramId: ['', Validators.required],
            lenderId: ['', Validators.required],
            itemId: '',
            batchId: '',
            callBackURL: ''
        });
        this.borrowerForm = this.fb.group({
            borrowerId: ['', Validators.required],
            firstName: ['', Validators.required],
            middleName: '',
            lastName: ['', Validators.required],
            suffix: '',
            ssn: ['', Validators.required],
            dob: ['', Validators.required],
            score: [''],
            addresses: this.fb.array([]),
            phoneNumbers: this.fb.array([]),
            emailAddresses: this.fb.array([]),
            customData: [''],
            activeMilitary: ['', Validators.required],
            activePrivacy: ['', Validators.required],
            externalReferenceId: '',
            borrowerNumber: '',
            ecorrAccepted: ['', Validators.required],
            walletId: '',
            borrowerType: ['', Validators.required]
        });
        this.coBorrowerForm = this.fb.group({
          borrowerId: ['', Validators.required],
          firstName: ['', Validators.required],
          middleName: '',
          lastName: ['', Validators.required],
          suffix: '',
          ssn: ['', Validators.required],
          dob: ['', Validators.required],
          score: [''],
          addresses: this.fb.array([]),
          phoneNumbers: this.fb.array([]),
          emailAddresses: this.fb.array([]),
          customData: [''],
          activeMilitary: ['', Validators.required],
          activePrivacy: ['', Validators.required],
          externalReferenceId: '',
          borrowerNumber: '',
          ecorrAccepted: ['', Validators.required],
          walletId: '',
          borrowerType: ['', Validators.required]
      });
        this.loanForm = this.fb.group({
            term: ['', Validators.required] /* integer only */,
            interestRate: ['', Validators.required] /* numbers only */,
            margin: '' /* numbers only */,
            rateType: ['', Validators.required],
            externalReferenceId: '',
            loanNumber: '',
            customData: '',
            investors: this.fb.array([]),
            disbursements: this.fb.array([]),
            loanPeriodTypes: this.fb.array([])
        });
        this.loanPeriodForm = this.fb.group({
            fixedAmount: this.fb.group({
                paymentAmount: [''],
                firstPaymentDate: [''],
                paymentFrequency: [''],
                capInterestAtStart: [''],
                startDate: [''],
                reduceTerm: [''],
                loanPeriodTags: [''],
                reportingStatus: [''],
                loanStatus: ['']
            }),
            deferment: this.fb.group({
                capInterestAtStart: [''],
                startDate: [''],
                reduceTerm: [''],
                loanPeriodTags: [''],
                reportingStatus: [''],
                loanStatus: ['']
            }),
            interestOnly: this.fb.group({
                firstPaymentDate: [''],
                paymentFrequency: [''],
                capInterestAtStart: [''],
                startDate: [''],
                reduceTerm: [''],
                loanPeriodTags: [''],
                reportingStatus: [''],
                loanStatus: ['']
            }),
            principalInterest: this.fb.group({
                firstPaymentDate: [''],
                paymentFrequency: [''],
                capInterestAtStart: [''],
                startDate: [''],
                reduceTerm: [''],
                reportingStatus: [''],
                loanStatus: [''],
                loanPeriodTags: ['']
            })
        });
        this.addAddress();
        this.addPhone();
        this.setDisbursementsControls();
        this.addEmail();
        this.addCoBorrowerEmail();
        this.addCoBorrowerAddress();
        this.addCoBorrowerPhone();
    }
    onChange(event) {
        const loanPerTypes = (<FormArray>(
            this.loanForm.get('loanPeriodTypes')
        )) as FormArray;
        const sourceType = event.source.value;
        if (event.checked) {
            loanPerTypes.push(new FormControl(event.source.value));
            switch (sourceType) {
                case 'fixedAmount':
                    this.showFixedAmount = true;
                    break;
                case 'deferment':
                    this.showDeferment = true;
                    break;
                case 'interestOnly':
                    this.showInterestOnly = true;
                    break;
                case 'principalAndInterest':
                    this.showprincipalAndInterest = true;
                    break;
            }
        } else {
            const i = loanPerTypes.controls.findIndex(
                (x) => x.value === event.source.value
            );
            loanPerTypes.removeAt(i);
            switch (sourceType) {
                case 'fixedAmount':
                    this.showFixedAmount = false;
                    break;
                case 'deferment':
                    this.showDeferment = false;
                    break;
                case 'interestOnly':
                    this.showInterestOnly = false;
                    break;
                case 'principalAndInterest':
                    this.showprincipalAndInterest = false;
                    break;
            }
        }
    }

    setDisbursementsControls() {
        const dis = this.fb.group({
            disbursementDate: [''],
            amount: [''],
            originationFee: [''],
            externalReferenceId: ['']
        });
        (this.loanForm.get('disbursements') as FormArray).push(dis);
    }
    // gets disbursements to push controls into form array
    get disbursements(): FormArray {
        return this.loanForm.get('disbursements') as FormArray;
    }

    /* add address from form */
    addD() {
        this.setDisbursementsControls();
    }
    /* delete addresses */
    removeD(i: number) {
        this.disbursements.removeAt(i);
    }

    setFixedTags(data?: any) {
        const fixedArray = new FormArray([]);
        data?.forEach((fixed) => {
            fixedArray.push(
                this.fb.group({
                    tags: [data ? fixed : '']
                })
            );
        });
        return fixedArray;
    }
    setAddressFields() {
        const add = this.fb.group({
            isPrimary: [''],
            street1: [''],
            street2: [''],
            city: [''],
            state: [''],
            postalCode: [''],
            countryCode: ['']
        });
        (this.borrowerForm.get('addresses') as FormArray).push(add);
    }
    // gets addresses to push data into form array
    get addresses(): FormArray {
        return this.borrowerForm.get('addresses') as FormArray;
    }
    /* add address from form */
    addAddress() {
        this.setAddressFields();
    }
    /* delete addresses */
    removeAddress(i: number) {
        this.addresses.removeAt(i);
    }

    // sets phones form array
    setPhones() {
        const phones = this.fb.group({
            type: [''],
            phoneNumber: [''],
            isPrimary: [''],
            isMobile: [''],
            hasCellPhoneConsent: ['']
        });
        (this.borrowerForm.get('phoneNumbers') as FormArray).push(phones);
    }
    // gets phones to push data into form array
    get phoneNumbers(): FormArray {
        return this.borrowerForm.get('phoneNumbers') as FormArray;
    }
    addPhone() {
        this.setPhones();
    }
    /* delete phones */
    removePhone(ph: number) {
        this.phoneNumbers.removeAt(ph);
    }
    // gets emailAddresses to push data into form array
    get emailAddresses(): FormArray {
        return this.borrowerForm.get('emailAddresses') as FormArray;
    }
    addEmail() {
      this.setEmails();
    }
     /* delete email */
     removeEmail(em: number) {
      this.emailAddresses.removeAt(em);
  }
    setEmails() {
        const emails = this.fb.group({
            isPrimary: [''],
            emailAddress: ['']
        });
        (this.borrowerForm.get('emailAddresses') as FormArray).push(emails);
    }
    grabData() {
        const mergeAll = {
            generalSettings: this.generalSettingsForm.value,
            borrowerForm: this.borrowerForm.value,
            coBorrowerForm: this.coBorrowerForm.value,
            loanForm: this.loanForm.value
        };
        console.log(mergeAll);
    }
}
