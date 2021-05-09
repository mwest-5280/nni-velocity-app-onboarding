export interface EnvironmentVars {
  dev: devIds;
  qa: qaIds;
  train: trainIds;
  prod: prodIds;
}
// TO DO: All this could be configured by IGX once hooked up....
// currently set up for Firstmark Services
export enum devIds {
  userPoolId = 'us-west-2_WHSE88shs',
  appClientId = '7lq6b7b3d1fhtclfmncjqdubqh',

  // admin token ids
  adminUserPoolId = 'us-west-2_UiGMVxT0F',
  adminAppClientId = '6kmr3v065tfji6ed0nhhf8ljs8',

  servicerId = '2',
  tenantId = '314'
}

// currently set up for Firstmark Services
export enum qaIds {
  // for firstmark, normal environment in qa
  userPoolId = 'us-west-2_jw8C15J7S',
  appClientId = '54a23c9s4mle1huioaa7ovmjr6',
  adminUserPoolId = 'us-west-2_EdaMFu8Ur',
  adminAppClientId = '726von7dgadgcv3veb9imvel70',
  servicerId = '2',
  tenantId = '314',

  // negative test environment for conversion testing userpool IDs tenantId: '-1' and servicerId: '-3'
  negativeUserPoolId = 'us-west-2_aCdWVISBh',
  negativeAppClientId = 'kpou5qduv56f8klpdcrlt92qb',
  negativeTenantId = '-1',
  negativeServicerId = '-3'
}

// currently only set up for Access Loans
export enum trainIds {
  /* ACCESS LOANS = Lender
  userPoolId = 'us-west-2_HxnNhOHZD',
  appClientId = '3s3akl8nc15jcd49mq1i8j82e9', */

  /* FIRSTMARK SERVICES = Servicer */
  userPoolId = 'us-west-2_HSinsQlyx',
  appClientId = '5li0mr6idnrfahrlks0pf6tcmr',
  adminUserPoolId = 'us-west-2_EMyAjKnOa',
  adminAppClientId = 'a2o27bnc4al8d8mnrofb1kf89',

  tenantId = '301416',
  servicerId = '233142'
}

// currently only set up for Access Loans
export enum prodIds {
  uatUserPoolId = 'us-west-2_auy4cY6l2',
  uatAppClientId = '2n4cne0927krnasdqd1166c4th',
  uatTenantId = '614103',
  uatServicerId = '241332',

  prodUserPoolId = 'us-west-2_n9u0xPdmN',
  prodAppClientId = '475a93mfn0qc4q86dc4bd3fc5o',

  adminUserPoolId = 'us-west-2_aYWp5XpjO',
  adminAppClientId = '6cnnotul4vturb8pu0cnrs63jl',
  tenantId = '301416',
  servicerId = '233142'
}
