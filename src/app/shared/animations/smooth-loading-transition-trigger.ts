import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

/**
 * Creates a trigger by the name of @smoothLoadingTransition
 */
export const smoothLoadingTransitionTrigger: AnimationTriggerMetadata = trigger('smoothLoadingTransition', [
  transition(':enter', [style({ opacity: 0 }), animate('400ms', style({ opacity: 1 }))]),
  transition(':leave', [animate('250ms', style({ opacity: 0 }))]),
]);
