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
    showAddressBorder = false;

    rateTypes: string[] = ['Fixed', 'Variable'];

    /* borrower Type */
    borrowerType = ['Correspondence', 'Payment'];
    /* phone type */
    phoneType = ['home', 'work', 'other'];

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
            disbursements: this.fb.array([
                this.getDisbursementControls(),
                Validators.required
            ]),
            loanPeriods: this.fb.array([this.getLoanPeriods(), Validators.required])
        });
        this.addAddress();
        this.addPhone();
    }
    getLoanPeriods() {}
    getDisbursementControls() {
        return this.fb.group({
            disbursementDate: ['', Validators.required],
            amount: ['', Validators.required],
            originationFee: ''
        });
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
            isMobile: [""],
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
}
