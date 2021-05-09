export const environment = {
  prod: true,
  envName: 'prod',
  envList: ['qa', 'train', 'prod', 'uat'],
  loggerLevel: 'WARN',
  apiUrl: 'https://api.nelnet.io',
  camundaUrl: 'https://camunda.nelnet.io',
  contentBucket: 'prod_content/',
  authInterceptorWhitelist: ['/authapi/authenticate'],

  // how soon before the token expires do we want to warn the user
  tokenExpiringWarnMs: 1 * 60 * 1000, // 1 min
  // the number of milliseconds the user has to click the button in the modal, once it is shown, before they are logged out for the token expiring
  tokenTimeoutWarnMs: 1 * 60 * 1000, // 1 min
  tokenTimeoutBufferMs: 1 * 20 * 1000 // 20 seconds
};
