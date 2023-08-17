import { DialogBoxMediatorInterface } from '../interfaces/dialog-box-mediator.interface';

export abstract class WidgetAbstract {
  private _mediator!: DialogBoxMediatorInterface;

  get mediator(): DialogBoxMediatorInterface {
    return this._mediator;
  }

  set mediator(mediator: DialogBoxMediatorInterface) {
    this._mediator = mediator;
  }

  abstract getState(): any;
}
