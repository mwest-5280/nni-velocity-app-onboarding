import { Component, OnInit } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { DocumentUploadService } from 'src/app/services/document-upload.service';

@Component({
    selector: 'app-document-upload',
    templateUrl: './document-upload.component.html',
    styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
    loading: boolean;
    selectedFiles: any;
    message = '';
    showName: boolean;
    nameOfFile = '';
    lenderId: string;
    results = [];

    constructor(
        private csvParser: Papa,
        private documentUploadService: DocumentUploadService
    ) {}

    ngOnInit(): void {}

    // initial selection of file, here is where we hold before the upload to parse out the lenderid needed to send to api
    selectFiles(files: any): void {
        this.selectedFiles = files;
        this.showName = true;
        this.nameOfFile = this.selectedFiles[0].name;
        // parse csv data, should only have one lenderId inside csv file, we are not yet transferring from lender to new lender, all // transfers happen within the same lender for now.
        this.csvParser.parse(this.selectedFiles[0], {
            header: true,
            complete: (result) => {
                console.log(result.data);
                const csvData = result.data;
                console.log(csvData[1]);
                const postData = {
                    loanProgramId: csvData[0].loanProgramId,
                    lenderId: csvData[0].lenderid,
                    itemId: csvData[0].itemId,
                    batchId: csvData[0].batchId,
                    callBackURL: csvData[0].callBackURL,
                    borrowers: [
                        {
                            borrowerId: csvData[0]?.borrowerId,
                            firstName: csvData[0].borrowers__firstName,
                            middleName: csvData[0]?.borowers__middleName,
                            lastName: csvData[0].borrowers__lastName,
                            suffix: csvData[0]?.borrowers__suffix,
                            score: csvData[0]?.borrowers__score,
                            ssn: csvData[0].borrowers__ssn,
                            dob: csvData[0].borrowers__dob,
                            addresses: [
                                {
                                    street1: csvData[0]?.borrowers__addresses__street1,
                                    street2: csvData[0]?.borrowers__addresses__street2,
                                    city: csvData[0].borrowers__addresses__city,
                                    state: csvData[0].borrowers__addresses__state,
                                    postalCode:
                                        csvData[0].borrowers__addresses__postalCode,
                                    countryCode:
                                        csvData[0].borrowers__addresses__countryCode,
                                    isPrimary: csvData[0].borrowers__addresses__isPrimary
                                }
                            ],
                            phoneNumbers: [
                                {
                                    phoneNumber: 'string',
                                    isPrimary: true,
                                    isMobile: true,
                                    hasCellPhoneConsent: true,
                                    type: 'home'
                                }
                            ],
                            emailAddresses: [
                                {
                                    emailAddress: 'string',
                                    isPrimary: true
                                }
                            ],
                            customData: {},
                            activeMilitary: true,
                            activePrivacy: true,
                            externalReferenceId: 'string',
                            borrowerNumber: 'string',
                            ecorrAccepted: true,
                            walletId: 'string',
                            bankProfiles: [
                                {
                                    bankProfileName: 'string',
                                    routingNumber: 'string',
                                    accountNumber: 'string',
                                    accountType: 'Checking',
                                    accountHolderFirstName: 'string',
                                    accountHolderLastName: 'string',
                                    isAutoDebit: true
                                }
                            ],
                            autoDebit: {
                                terms: {
                                    type: 'HTML',
                                    content: 'string'
                                },
                                isActive: true
                            },
                            references: [
                                {
                                    firstName: 'string',
                                    middleName: 'string',
                                    lastName: 'string',
                                    street1: 'string',
                                    street2: 'string',
                                    city: 'string',
                                    state: 'string',
                                    postalCode: 'string',
                                    countryCode: 'string',
                                    phoneNumber: 'string',
                                    emailAddress: 'string'
                                }
                            ],
                            activeOfac: true,
                            borrowerType: 'string'
                        },
                        {
                            borrowerId: csvData[1]?.borrowerId,
                            firstName: csvData[1].borrowers__firstName
                        }
                    ]
                };
                console.log(postData);
            }
        });
    }

    convertData(files: any) {
        //return this.csvParser.unparse(files);
        console.log(this.csvParser.unparse(files));
    }

    // used to send selected files to the upload service, we need to pause and let the user hit 'schedule transfer' button,
    uploadFiles(): void {
        this.message = '';
        this.upload(this.selectedFiles);
    }

    // upload file for bulk
    upload(file: any): void {
        this.loading = true;
        const uploadObj = {
            file,
            fileName: file[0].name,
            lenderId: this.lenderId,
            mimeType: 'txt/csv'
        };
        this.documentUploadService.upload(uploadObj).subscribe(
            (resData) => {
                console.log(resData);
                this.showName = false;
                this.message = '';
                this.selectedFiles = false;
            },
            () => {
                this.loading = false;
            }
        );
    }

    // clear input, clear out error message if any
    clearInput() {
        this.message = '';
        this.showName = false;
        this.selectedFiles = false;
    }
}
