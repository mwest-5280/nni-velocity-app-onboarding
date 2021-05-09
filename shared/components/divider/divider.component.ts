import { Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-divider',
  template: '',
  styles: [
    `
      .app-divider {
        display: block;
        margin: 0;
        border-top-width: 1px;
        border-top-style: solid;
        border-top-color: #eee;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class DividerComponent {
  @HostBinding('class') styleClass = 'app-divider';

  // The following were taken as an example from the Material mat-divider component
  // Reference: https://github.com/angular/components/blob/master/src/material/divider/divider.ts
  @HostBinding('attr.role') role = 'separator';
  @HostBinding('attr.aria-orientation') orientation = 'horizontal';

  constructor() {}
}
