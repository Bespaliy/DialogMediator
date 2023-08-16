import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../abstractions/base-component.component';
import { CheckBoxType } from './check-box.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent extends Widget {
  public _checkBox: CheckBoxType = { name: '', checked: false };
  @Input() set checkBox(checkBox: CheckBoxType) {
    this._checkBox = checkBox;
  }
  constructor() {
    super();
  }

  getSelection() {
    return this._checkBox;
  }
  handleOnChecked(item: CheckBoxType, checked: boolean) {
    this.checkBox = { ...item, checked };
    this.mediator.widgetChanged(this);
  }
}
