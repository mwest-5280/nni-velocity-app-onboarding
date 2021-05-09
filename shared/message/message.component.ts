import { Component, Input } from '@angular/core';
import { MessageTypeEnum } from '../../models/messages';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() type: MessageTypeEnum;
  @Input() title: string;
  @Input() message: string;

  constructor() {}

  get isSuccess() {
    return this.type === MessageTypeEnum.SUCCESS;
  }

  get isInfo() {
    return this.type === MessageTypeEnum.INFO;
  }

  get isWarning() {
    return this.type === MessageTypeEnum.WARNING;
  }

  get isError() {
    return this.type === MessageTypeEnum.ERROR;
  }
}
