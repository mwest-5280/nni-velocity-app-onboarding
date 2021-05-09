import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export interface Action {
  type: string;
}

export type ActionEvent<P> = Action & P;

export type Creator<P> = (props: P) => ActionEvent<P>;

export type ActionCreator<P> = Action & Creator<P>;

// TODO: make a 'void' createAction when no arguments are required.

export function createAction<P extends object>(type: string): ActionCreator<P> {
  const creator = (props: P) => ({ ...(props as object), type });

  // Add 'type' property to the creator function, hence the ActionCreator type
  return Object.defineProperty(creator, 'type', {
    value: type,
    writable: false
  });
}

// Full disclosure - derived from the following sources:
// - https://www.youtube.com/watch?v=_q-HL9YX_pk
// - NgRx
//   - https://github.com/ngrx/platform/blob/master/modules/store/src/action_creator.ts
//   - https://github.com/ngrx/platform/blob/master/modules/store/src/models.ts
@Injectable({
  providedIn: 'root'
})
export class ActionEventsService {
  private events$ = new Subject<ActionEvent<any>>();

  constructor() {}

  dispatch<P>(action: ActionEvent<P>) {
    this.events$.next(action);
  }

  dispatchForEach<P>(items: P[], actionCreator: ActionCreator<P>) {
    items.forEach(item => this.dispatch(actionCreator(item)));
  }

  on<P>(action: Action): Observable<P> {
    return this.events$.pipe(
      filter(event => event.type === action.type),
      map(event => event as P)
    );
  }
}
