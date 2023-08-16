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
  @Input() content = 'Click';
  @Input() disabled = false;
  constructor() {
    super();
  }

  protected handleOnClick() {
    this.mediator.widgetChanged(this);
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }
}
