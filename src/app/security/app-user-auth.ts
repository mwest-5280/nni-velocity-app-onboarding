export class AppUserAuth {
  accessToken = '';
  tokenType = ' ';
  issuedAt: number;
  expiresIn: number;

  userName = '';
  canEditName = false;
  canEditDob = false;
  canEditSsn = false;

  aud = '';
  ['cognito:groups']: string[];
  ['cognito:username'] = '';
  email = '';
  exp: number = null;
  iat: number = null;
  iss = '';
  lenders = '';
  poolClientId = '';
  region = '';
  servicerId: number = null;
  sub = '';
  tenantId: number = null;
  userPoolId = '';
}

export enum AuthRoleEnum {
  SERVICERCONFIGURATION = 'servicerconfiguration',
  READONLY = 'servicerconfiguration_readonly',
  COMM_ONLY = 'servicerconfiguration_comm_only'
}
