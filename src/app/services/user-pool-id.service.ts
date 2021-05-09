import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { devIds, prodIds, qaIds, trainIds } from '../models/environmentVariables';

@Injectable({
  providedIn: 'root'
})
export class UserPoolIdService {
  options: any;
  prodValues = prodIds;
  devValues = devIds;
  qaValues = qaIds;
  trainValues = trainIds;
  envName = environment.envName;

  constructor() {}

  // userpool/appclient IDs... used for flippy do switch authentication, can not be used for tenant/servicer ids... not yet, admin token needs it own id service, can be revisited and ripped out later
  getUserPoolAndAppClientIds(servicerIds?: any) {
    if (this.envName === 'prod' && servicerIds === 'accessloansuat') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.prodValues.uatUserPoolId,
          appclientid: this.prodValues.uatAppClientId
        })
      };
    } else if (this.envName === 'prod' && servicerIds === 'accessloansprod') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.prodValues.prodUserPoolId,
          appclientid: this.prodValues.prodAppClientId
        })
      };
    } else if (this.envName === 'dev' && servicerIds === 'firstmarkdev') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.devValues.userPoolId,
          appclientid: this.devValues.appClientId
        })
      };
    } else if (this.envName === 'dev' && servicerIds === 'adminUser') {
      if (servicerIds === 'adminUser') {
        this.options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            userpoolid: this.devValues.adminUserPoolId,
            appclientid: this.devValues.adminAppClientId
          })
        };
      }
    } else if (this.envName === 'qa' && servicerIds === 'firstmarkqa') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.qaValues.userPoolId,
          appclientid: this.qaValues.appClientId
        })
      };
    } else if (this.envName === 'qa' && servicerIds === 'adminUser') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.qaValues.adminUserPoolId,
          appclientid: this.qaValues.adminAppClientId
        })
      };
    } else if (this.envName === 'qa' && servicerIds === 'negativeQa') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.qaValues.negativeUserPoolId,
          appclientid: this.qaValues.negativeAppClientId
        })
      };
    } else if (this.envName === 'train' && servicerIds === 'accessloanstrain') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.trainValues.userPoolId,
          appclientid: this.trainValues.appClientId
        })
      };
    } else if (this.envName === 'train' && servicerIds === 'adminUser') {
      this.options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          userpoolid: this.trainValues.userPoolId,
          appclientid: this.trainValues.appClientId
        })
      };
    }
    return this.options;
  }
}
