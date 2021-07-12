import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
    loanForm: FormGroup;
    loanPeriodForm: FormGroup;
    fixedAmount: FormGroup;
    deferment: FormGroup;
    interestOnly: FormGroup;
    principalAndInterest: FormGroup;
    showAddressBorder = false;
    /* loan rate types */
    rateTypes: string[] = ['Fixed', 'Variable'];
    /* borrower Type */
    borrowerType = ['Correspondence', 'Payment'];
    /* phone type */
    phoneType = ['home', 'work', 'other'];
    /* loan period types */
    loanPeriodType = ['fixedAmount', 'deferment', 'interestOnly', 'principalAndInterest'];
    selectedLoanPeriod: string;
    paymentFrequency = ['weekly', 'bi-weekly', 'monthly', 'quarterly'];
    loanStatus = ['repayment', 'deferred'];

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
            addresses: this.fb.array([]),
            phoneNumbers: this.fb.array([]),
            emailAddresses: this.fb.array([]),
            customData: this.fb.array([this.getCustomDataControls()]),
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
            customData: this.fb.array([this.getCustomDataControls()]),
            investors: this.fb.array([]),
            disbursements: this.fb.array([])
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
                loanPeriodTags: '',
                reportingStatus: [''],
                loanStatus: ['']
            })
        });
        this.addAddress();
        this.addPhone();
        this.setDisbursementsControls();
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

    getCustomDataControls() {
        return this.fb.group({
            keyArray: [],
            valueArray: []
        });
    }
    setAddressFields() {
        const add = this.fb.group({
            type: [''],
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

    setDeferment() {
        this.deferment = this.fb.group({
            capInterestAtStart: [''],
            startDate: [''],
            reduceTerm: [''],
            loanPeriodTags: '',
            reportingStatus: [''],
            loanStatus: ['']
        });
    }
    get defermentTags(): FormArray {
        return this.deferment.get('loanPeriodTags') as FormArray;
    }
    setInterestOnly() {
        this.interestOnly = this.fb.group({
            firstPaymentDate: [''],
            paymentFrequency: [''],
            capInterestAtStart: [''],
            startDate: [''],
            reduceTerm: [''],
            loanPeriodTags: '',
            reportingStatus: [''],
            loanStatus: ['']
        });
    }
    get interestOnlyTags(): FormArray {
        return this.interestOnly.get('loanPeriodTags') as FormArray;
    }
    setPrincipalAndInterest() {
        this.principalAndInterest = this.fb.group({
            firstPaymentDate: [''],
            paymentFrequency: [''],
            capInterestAtStart: [''],
            startDate: [''],
            reduceTerm: [''],
            loanPeriodTags: this.fb.array([]),
            reportingStatus: [''],
            loanStatus: ['']
        });
    }
    get principalInterestTags(): FormArray {
        return this.principalAndInterest.get('loanPeriodTags') as FormArray;
    }
}
