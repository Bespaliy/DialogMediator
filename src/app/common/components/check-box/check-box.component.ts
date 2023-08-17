import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetAbstract } from '../../abstract-classes/widget.abstract';
import { CheckBoxType } from './check-box.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
})
export class CheckBoxComponent extends WidgetAbstract {
  public _checkBox: CheckBoxType = { name: '', checked: false };

  @Input() set checkBox(checkBox: CheckBoxType) {
    this._checkBox = checkBox;
  }

  override getState() {
    return this._checkBox;
  }

  setChecked(checked: boolean) {
    this.checkBox = { ...this._checkBox, checked };
  }

  protected handleOnChecked(item: CheckBoxType, checked: boolean) {
    this.checkBox = { ...item, checked };
    this.mediator.widgetChanged(this);
  }
}
