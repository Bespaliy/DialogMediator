import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../abstractions/base-component.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent extends Widget {
  private _name = 'Click';
  private _disabled = false;

  get name() {
    return this._name;
  };

  get disabled() {
    return this._disabled;
  };

  @Input() set name(name: string) {
    this._name = name;
  };

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
  };

  protected handleOnClick() {
    this.mediator.widgetChanged(this);
  }

  override getState() {}

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }

  setName(name: string) {
    this.name = name
  }
}
