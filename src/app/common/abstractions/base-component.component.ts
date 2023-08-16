import { DialogBoxMediator } from './dialog-box.mediator';

export abstract class Widget {
  private _mediator!: DialogBoxMediator;

  get mediator(): DialogBoxMediator {
    return this._mediator;
  }

  set mediator(mediator: DialogBoxMediator) {
    this._mediator = mediator; 
  }

  abstract getState(): any;
}
