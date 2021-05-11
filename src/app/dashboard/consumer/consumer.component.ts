import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-consumer',
    templateUrl: './consumer.component.html',
    styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
    generalSettingsForm: FormGroup;
    borrowerForm: FormGroup;
    loanForm: FormGroup;

    rateTypes: string[] = ['Fixed', 'Variable'];

    constructor(private fb: FormBuilder) {}

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
            disbursements: this.fb.array([this.getDisbursementControls(), Validators.required]),
            loanPeriods: this.fb.array([this.getLoanPeriods(), Validators.required])
        });
    }
    getLoanPeriods() {

    }
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
}
