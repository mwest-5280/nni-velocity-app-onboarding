export const environment = {
  prod: false,
  envName: 'dev',
  envList: ['qa', 'train', 'prod', 'uat'],
  loggerLevel: 'DEBUG', // DEBUG | TRACE | INFO | WARN | ERROR | FATAL
  apiUrl: 'https://development.nelnet.io',
  camundaUrl: 'https://camunda.nelnet.io',
  contentBucket: 'dev_content/',
  authInterceptorWhitelist: [
    '/authapi/authenticate',
    'https://qa.nelnet.io/loanprogramapi/loanprograms/full',
    'https://train.nelnet.io/loanprogramapi/loanprograms/full',
    'https://api.nelnet.io/loanprogramapi/loanprograms/full',
    'https://qa.nelnet.io/lenderapi/lenders',
    'https://train.nelnet.io/lenderapi/lenders',
    'https://api.nelnet.io/lenderapi/lenders'
  ],

  // how soon before the token expires do we want to warn the user
  tokenExpiringWarnMs: 1 * 60 * 1000, // 1 min
  // the number of milliseconds the user has to click the button in the modal, once it is shown, before they are logged out for the token expiring
  tokenTimeoutWarnMs: 1 * 60 * 1000, // 1 min
  tokenTimeoutBufferMs: 1 * 20 * 1000 // 20 seconds
};
