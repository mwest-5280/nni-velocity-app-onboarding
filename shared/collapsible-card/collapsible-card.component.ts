import { Component, EventEmitter, Input, Output, TemplateRef, Injectable } from '@angular/core';

@Component({
  selector: 'app-collapsible-card',
  templateUrl: './collapsible-card.component.html',
  styleUrls: ['./collapsible-card.component.scss']
})
@Injectable()
export class CollapsibleCardComponent {
  @Input() open = true;
  @Output() opened: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() description: TemplateRef<any>;
  @Input() content: TemplateRef<any>;

  @Input() descriptionHeight: string;

  constructor() {}

  onOpened() {
    this.open = true;
    this.opened.emit(this.open);
  }

  onClosed() {
    this.open = false;
  }
}
