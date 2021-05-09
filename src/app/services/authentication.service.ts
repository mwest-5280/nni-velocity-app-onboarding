import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppUserAuth } from '../security/app-user-auth';
import { AuthRoleEnum } from '../security/auth-role.enum';
import JWT from 'jwt-decode';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from 'rxjs/operators';
import { devIds, prodIds, qaIds, trainIds } from '../models/environmentVariables';
import { UserPoolIdService } from '../services/user-pool-id.service';

@Injectable()
export class AuthenticationService {
  apiUrl = environment.apiUrl;
  envName = environment.envName;
  prodValues = prodIds;
  devValues = devIds;
  qaValues = qaIds;
  trainValues = trainIds;
  environmentList: any;

  private authenticated = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticated.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private userPoolService: UserPoolIdService,
    @Inject(LOCAL_STORAGE) private storage: StorageService
  ) {}

  // environment clone authLogic... leave code here the way it is for now, not sure we need to clone into negative conversion // // environment, we will change it when it's decided upon
  environmentAuthLogic(userName: string, password: string, environmentList: string): Observable<AppUserAuth> {
    // set the auth variables
    let url;
    let options;
    const body: any = {
      userName,
      password,
      async: false
    };
    if (environmentList === 'uat') {
      url = 'https://api.nelnet.io/authapi/authenticate?usecache=false';
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.prodValues.uatUserPoolId,
          appclientid: this.prodValues.uatAppClientId
        })
      };
    } else if (environmentList === 'prod') {
      url = 'https://api.nelnet.io/authapi/authenticate?usecache=false';
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.prodValues.prodUserPoolId,
          appclientid: this.prodValues.prodAppClientId
        })
      };
    } else if (environmentList === 'dev') {
      url = 'https://development.nelnet.io/authapi/authenticate?usecache=false';
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.devValues.userPoolId,
          appclientid: this.devValues.appClientId
        })
      };
    } else if (environmentList === 'qa') {
      url = 'https://qa.nelnet.io/authapi/authenticate?usecache=false';
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.qaValues.userPoolId,
          appclientid: this.qaValues.appClientId
        })
      };
    } else if (environmentList === 'train') {
      url = 'https://train.nelnet.io/authapi/authenticate?usecache=false';
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.trainValues.userPoolId,
          appclientid: this.trainValues.appClientId
        })
      };
    }

    return this.http.post<AppUserAuth>(url, body, options).pipe(
      map((response: any) => {
        const data = response.data;
        return data;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Regular login
  basicAuthLogic(userName: string, password: string, servicerIds: string): Observable<AppUserAuth> {
    const url = this.apiUrl + '/authapi/authenticate?usecache=false';
    // gets userpoolIds needed based off the servicerId chosen
    const options = this.userPoolService.getUserPoolAndAppClientIds(servicerIds);
    const body: any = {
      userName,
      password,
      async: false
    };
    console.log(options);
    return this.http.post<AppUserAuth>(url, body, options).pipe(
      map((response: any) => {
        const data = response.data;
        const tokenData: AppUserAuth = JWT(data.accessToken);
        if (`${tokenData.exp}`.length > 10) {
          console.warn(`expiration in token has more than 10 chars, it may be milliseconds when we expect seconds`);
        }
        const expiresAtMs = tokenData.exp * 1000;
        this.persistsAuthData(data.accessToken, expiresAtMs, tokenData, tokenData.servicerId);
        this.authenticated.next(true);
        return tokenData;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  resetPassword(username: any, servicerIds: any) {
    const url = this.apiUrl + '/authapi/password/forgot';
    // gets userpoolIds needed based off the servicerId chosen
    const options = this.userPoolService.getUserPoolAndAppClientIds(servicerIds);
    const body: any = {
      userName: username
    };
    return this.http.post(url, body, options);
  }

  confirmNewPassword(userName: any, newPassword: any, confirmationNumber: any, servicerIds: any) {
    const url = this.apiUrl + '/authapi/password/forgot/confirm';
    // gets userpoolIds needed based off the servicerId chosen
    const options = this.userPoolService.getUserPoolAndAppClientIds(servicerIds);
    const body: any = {
      userName,
      verificationCode: confirmationNumber,
      newPassword
    };
    return this.http.post(url, body, options);
  }

  updatePassword(currentPassword: string, newPassword: string, servicerIds: any): Observable<any> {
    const url = this.apiUrl + '/authapi/password/change';
    // gets userpoolIds needed based off the servicerId chosen
    const options = this.userPoolService.getUserPoolAndAppClientIds(servicerIds);
    const username = this.getUsername();
    const body: any = {
      userName: username,
      oldPassword: currentPassword,
      newPassword
    };
    return this.http.post(url, body, options);
  }

  logout(continueToAfterLogin: string = null): void {
    this.clearAuthData();
    this.authenticated.next(false);
    this.dialog.closeAll();
    if (continueToAfterLogin) {
      this.router.navigate(['/login'], { queryParams: { continue: continueToAfterLogin } });
    } else {
      this.router.navigate(['/login']);
    }
  }

  persistsAuthData(token: string, expires: number, securityObject: AppUserAuth, servicerId: number): void {
    this.storage.set('token', token);
    this.storage.set('expires', expires);
    this.storage.set('securityObject', securityObject);
    this.storage.set('servicerId', servicerId);
  }

  retrieveAuthData(): { token: string; expires: number; securityObject: AppUserAuth; servicerId: AppUserAuth } {
    return {
      token: this.storage.get('token'),
      expires: this.storage.get('expires'),
      securityObject: this.storage.get('securityObject'),
      servicerId: this.storage.get('servicerId')
    };
  }

  clearAuthData(): void {
    this.storage.remove('token');
    this.storage.remove('securityObject');
    this.storage.remove('servicerId');
    this.storage.remove('expires');
    this.storage.remove('lenderProgramList');
    this.storage.remove('LenderSetup');
    this.storage.remove('tenantId');
    this.storage.remove('searchList');
    this.storage.remove('schoolSearchList');
    this.storage.remove('bankName');
    this.storage.remove('InvestorList');
    this.storage.remove('authenticatedUserName');
  }

  getToken() {
    return this.retrieveAuthData().token;
  }

  public getSecurityObject(): AppUserAuth {
    return this.retrieveAuthData().securityObject;
  }

  public getServicerId(): AppUserAuth {
    return this.retrieveAuthData().servicerId;
  }

  public isnegativeQa(): boolean {
    const securityObject = this.getSecurityObject();
    return securityObject.poolClientId === 'kpou5qduv56f8klpdcrlt92qb';
  }

  public isProdUat(): boolean {
    const securityObject = this.getSecurityObject();
    return securityObject.poolClientId === '2n4cne0927krnasdqd1166c4th';
  }

  public getUsername(): string {
    const obj = this.retrieveAuthData().securityObject;
    if (obj) {
      return obj['cognito:username'];
    }
  }

  public securityObjectRolesIncludes(role: AuthRoleEnum): boolean {
    const securityObject = this.getSecurityObject();
    return securityObject && securityObject['cognito:groups'] && securityObject['cognito:groups'].includes(role);
  }

  /*
   * Determine if the current user has the 'Servicer Configuration, everything' role.
   *
   * @see securityObjectRolesIncludes
   * @see AuthRoleEnum.SERVICERCONFIGURATION
   * @returns boolean
   */
  public isServicerConfigUser(): boolean {
    return this.securityObjectRolesIncludes(AuthRoleEnum.SERVICERCONFIGURATION);
  }

  /*
   * Determine if the current user is an Admin User.
   *
   * @see securityObjectRolesIncludes
   * @see AuthRoleEnum.ADMIN
   * @returns boolean
   */
  public isAdminUser(): boolean {
    return this.securityObjectRolesIncludes(AuthRoleEnum.ADMIN);
  }

   /*
   * Determine if the current user is an Admin User.
   *
   * @see securityObjectRolesIncludes
   * @see AuthRoleEnum.SCHOOL
   * @returns boolean
   */
   public isSchoolUser(): boolean {
    return this.securityObjectRolesIncludes(AuthRoleEnum.SCHOOL);
  }

  /**
   * Determine if the current user has the 'ServicerConfiguration Read Only' role.
   *
   * @see securityObjectRolesIncludes
   * @see AuthRoleEnum.READONLY
   * @returns boolean
   */
  public isServicerReadOnly(): boolean {
    return this.securityObjectRolesIncludes(AuthRoleEnum.READONLY);
  }

  /**
   * Determine if the current user has the 'ServicerConfiguration Communications Only' role.
   *
   * @see securityObjectRolesIncludes
   * @see AuthRoleEnum.COMM_ONLY
   * @returns boolean
   */
  isServicerCommsOnly() {
    return this.securityObjectRolesIncludes(AuthRoleEnum.COMM_ONLY);
  }

  public isUserAuthenticated(): boolean {
    const now = Date.now();
    const expires = this.retrieveAuthData().expires;
    if (!expires) {
      return false;
    }
    return expires > now;
  }
}
