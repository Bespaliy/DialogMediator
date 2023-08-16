import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Widget } from '../../abstractions/base-component.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends Widget {
  @Input() set content(text: string) {
    this._content = text;
  }
  @Input() placeholder: string = '';
  protected status: 'basic' | 'danger' = 'basic';
  protected type: 'password' | 'text' = 'password';

  protected _content = '';

  constructor() {
    super();
  }

  getText() {
    return this._content;
  }

  setStatus(status: 'basic' | 'danger') {
    this.status = status;
  }

  setType(type: 'password' | 'text') {
    this.type = type;
  }

  handleOnInput(text: string) {
    this._content = text;
    this.mediator.widgetChanged(this);
  }
}
