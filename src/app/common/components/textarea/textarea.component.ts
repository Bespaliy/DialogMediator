import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../abstractions/base-component.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends Widget {
  @Input() set content(text: string) {
    this._content = text;
  }
  @Input() placeholder: string = '';
  @Input() disabled = false;
  protected status: 'basic' | 'danger' = 'basic';
  protected _content = '';

  override getState() {
    return this._content;
  }

  setStatus(status: 'basic' | 'danger') {
    this.status = status;
  }

  setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }

  handleOnInput(text: string) {
    this._content = text;
    this.mediator.widgetChanged(this);
  }
}
