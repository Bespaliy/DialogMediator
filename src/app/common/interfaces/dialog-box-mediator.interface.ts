import { WidgetAbstract } from '../abstract-classes/widget.abstract';

export interface DialogBoxMediatorInterface {
  widgetChanged(widget: WidgetAbstract): void;
  registerMediator(widget: WidgetAbstract): void;
}
