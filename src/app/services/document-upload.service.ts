import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocumentUploadService {
    constructor(private http: HttpClient) {}

    // uploads bulk files
    upload(uploadObj: any) {
        return this.http
            .post<any>(uploadObj, { reportProgress: true, observe: 'response' })
            .pipe(
                map((response: any) => {
                    let uploadRes;
                    uploadRes = response.body.data;
                    return uploadRes;
                })
            );
    }
}
