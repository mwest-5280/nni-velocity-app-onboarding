export const environment = {
  prod: true,
  envName: 'qa',
  envList: ['train', 'prod', 'uat'],
  loggerLevel: 'INFO',
  apiUrl: 'https://qa.nelnet.io',
  contentBucket: 'qa_content/',
  camundaUrl: 'https://camunda.nelnet.io',
  authInterceptorWhitelist: [
    '/authapi/authenticate',
    'https://train.nelnet.io/loanprogramapi/loanprograms/full',
    'https://api.nelnet.io/loanprogramapi/loanprograms/full',
    'https://train.nelnet.io/lenderapi/lenders',
    'https://api.nelnet.io/lenderapi/lenders'
  ],
  // how soon before the token expires do we want to warn the user
  tokenExpiringWarnMs: 1 * 60 * 1000, // 1 min
  // the number of milliseconds the user has to click the button in the modal, once it is shown, before they are logged out for the token expiring
  tokenTimeoutWarnMs: 1 * 60 * 1000, // 1 min
  tokenTimeoutBufferMs: 1 * 20 * 1000 // 20 seconds
};
