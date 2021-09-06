import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {
    apiUrl = environment.apiUrl;
    private loanProgramUrl = this.apiUrl + '/loanprogramapi/loanprograms';

    constructor(private http: HttpClient) {}

    getCoBorrowerType(loanProgramId: string) {
        return this.http
            .get<any>(`${this.loanProgramUrl}/${loanProgramId}`, {
                observe: 'response'
            })
            .pipe(
                map((response: any) => {
                    return response.body.data;
                }),
                catchError((error) => {
                    return throwError(error);
                })
            );
    }
}
