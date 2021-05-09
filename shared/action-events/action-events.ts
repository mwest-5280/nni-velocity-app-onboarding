import { createAction } from './action-events.service';

export interface LenderId {
  lenderId: string;
}

// Consider trying the props<type_here>() trick. The createAction would need to infer the from that
// argument tell TSLint to ignore the unused argument

export const lenderChange = createAction<LenderId>('lender.status.change');

export const demographicsChange = createAction('lender.demographics.change');
