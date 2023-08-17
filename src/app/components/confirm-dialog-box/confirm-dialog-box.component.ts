import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxMediatorInterface } from '../../common/interfaces/dialog-box-mediator.interface';
import { ButtonComponent } from '../../common/components/button/button.component';
import { TextBoxComponent } from '../../common/components/text-box/text-box.component';
import { WidgetAbstract } from '../../common/abstract-classes/widget.abstract';
import { CheckBoxComponent } from '../../common/components/check-box/check-box.component';
import { CheckBoxContent } from '../../common/components/check-box/check-box.type';
import { TextareaComponent } from '../../common/components/textarea/textarea.component';

@Component({
  selector: 'app-confirm-dialog-box',
  standalone: true,
  imports: [
    CommonModule,
    TextBoxComponent,
    ButtonComponent,
    CheckBoxComponent,
    TextareaComponent,
  ],
  templateUrl: './confirm-dialog-box.component.html',
  styleUrls: ['./confirm-dialog-box.component.scss'],
})
export class ConfirmDialogBoxComponent
  implements DialogBoxMediatorInterface, AfterViewInit
{
  @ViewChild('submit') private buttonSubmit!: ButtonComponent;
  @ViewChild('cancel') private buttonCancel!: ButtonComponent;
  @ViewChild(TextareaComponent) private textarea!: TextareaComponent;
  @ViewChildren(CheckBoxComponent)
  private checkBoxes!: QueryList<CheckBoxComponent>;
  @ViewChild(TextBoxComponent) private textBox!: TextBoxComponent;

  @Output() close = new EventEmitter<void>();

  protected checkBoxContent: CheckBoxContent = [
    { name: 'Book was lost', checked: false },
    { name: 'Book was damaged', checked: false },
    { name: 'Other', checked: false },
  ];

  ngAfterViewInit(): void {
    this.registerMediator(this.buttonCancel);
    this.registerMediator(this.buttonSubmit);
    this.registerMediator(this.textBox);
    this.registerMediator(this.textarea);
    this.checkBoxes.forEach((checkBox) => {
      this.registerMediator(checkBox);
    });
  }

  private handleOnCheckBoxChange(widget: WidgetAbstract) {
    const checkBox = this.checkBoxes.find((item) => item === widget);
    if (!checkBox) return;

    const select = checkBox.getState();
    const isOther = select.name === 'Other';

    this.checkBoxes.forEach((checkBox) => {
      if (select !== checkBox.getState()) {
        checkBox.setChecked(false);
      }
    });

    this.textarea.setDisabled(!isOther);
    this.buttonSubmit.setDisabled(!select.checked);
  }

  private handleOnCancelClick(widget: WidgetAbstract) {
    if (widget !== this.buttonCancel) return;
    this.close.emit();
  }

  private handleOnSubmitClick(widget: WidgetAbstract) {
    if (widget !== this.buttonSubmit) return;
    this.close.emit();
  }

  private handleOnTextareaChange(widget: WidgetAbstract) {
    if (widget === this.textarea) {
      const text = this.textarea.getState();
      const isTextLengthGreaterThan10 = text.length > 10;

      this.textarea.setStatus(
        isTextLengthGreaterThan10 ? 'danger' : 'basic'
      );
      this.buttonSubmit.setDisabled(isTextLengthGreaterThan10);
    }
  }

  widgetChanged(widget: WidgetAbstract) {
    this.handleOnCheckBoxChange(widget);
    this.handleOnTextareaChange(widget);
    this.handleOnCancelClick(widget);
    this.handleOnSubmitClick(widget);
  }

  registerMediator(widget: WidgetAbstract): void {
    widget.mediator = this;
  }
}
