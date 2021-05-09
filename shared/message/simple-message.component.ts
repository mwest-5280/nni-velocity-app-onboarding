import { Component, Input } from '@angular/core';
import { Message } from '../../models/messages';

@Component({
  selector: 'app-simple-message',
  template: `
    <app-message [type]="message.type" [title]="message.title" [message]="message.message"></app-message>
  `
})
export class SimpleMessageComponent {
  @Input() message: Message;

  constructor() {}
}
