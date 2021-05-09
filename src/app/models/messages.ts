export enum MessageTypeEnum {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

export interface Message {
  type: MessageTypeEnum;
  title?: string;
  message: string;
}
