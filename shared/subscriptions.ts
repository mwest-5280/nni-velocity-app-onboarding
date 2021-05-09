import { MonoTypeOperatorFunction, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * A helpful rxjs Observable subscription helper based on the lovely SubSink module:
 * https://github.com/wardbell/subsink
 *
 * This helper differs from it in that it provides a custom Observable operator for
 * completing observables.
 */
export class Subscriptions {
  private notifier$ = new Subject<void>();
  private subscriptions = new Subscription();

  unsubscribe() {
    // First complete any Observables utilizing the takeUntilUnsubscribed operator
    this.notifier$.next();
    this.notifier$.complete();

    // Finally, unsubscribe to all registered subscriptions.
    this.subscriptions.unsubscribe();
  }

  set add(subscription: Subscription) {
    this.subscriptions.add(subscription);
  }

  /**
   * Take until the Subscriptions instance is unsubscribed to. This is crucial to fire the
   * complete lifecycle of an Observable.
   *
   * In order for this to function you either need to explicitly call the unsubscribe
   * function on the instance of Subscriptions.
   *
   * @see unsubscribe
   */
  takeUntilUnsubscribed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.notifier$);
  }
}
