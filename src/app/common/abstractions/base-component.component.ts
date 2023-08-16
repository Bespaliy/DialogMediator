import { DialogBoxMediator } from './dialog-box.mediator';

export class Widget {
  protected mediator: DialogBoxMediator;

  constructor(mediator?: DialogBoxMediator) {
    this.mediator = mediator!;
  }

  public setMediator(mediator: DialogBoxMediator): void {
    this.mediator = mediator;
  }
}
