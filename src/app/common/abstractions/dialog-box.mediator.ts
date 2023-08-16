import { Widget } from './base-component.component';

export interface DialogBoxMediator {
  widgetChanged(widget: Widget): void;
}
