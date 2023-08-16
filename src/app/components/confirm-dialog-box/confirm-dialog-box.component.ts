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
import { DialogBoxMediator } from '../../common/abstractions/dialog-box.mediator';
import { ButtonComponent } from '../../common/components/button/button.component';
import { TextBoxComponent } from '../../common/components/text-box/text-box.component';
import { Widget } from '../../common/abstractions/base-component.component';
import { CheckBoxComponent } from '../../common/components/check-box/check-box.component';
import { CheckBoxContent } from '../../common/components/check-box/check-box.type';
import { TextareaComponent } from '../../common/components/textarea/textarea.component';
import { ThisReceiver } from '@angular/compiler';

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
  implements DialogBoxMediator, AfterViewInit
{
  @ViewChild('submit') private buttonSubmit!: ButtonComponent;
  @ViewChild('cancel') private buttonCancel!: ButtonComponent;
  @ViewChild(TextareaComponent) private textarea!: TextareaComponent;
  @ViewChildren(CheckBoxComponent)
  private checkBoxes!: QueryList<CheckBoxComponent>;
  @ViewChild(TextBoxComponent) private textBox!: TextBoxComponent;

  @Output() close = new EventEmitter<void>();

  protected textBoxContent = [
    'The book will be removed from bookshelf after administrator approval.\n' +
      'Please specify the reason for the removal:',
  ];
  protected checkBoxContent: CheckBoxContent = [
    { name: 'Book was lost', checked: false },
    { name: 'Book was damaged', checked: false },
    { name: 'Other', checked: false },
  ];
  protected textareaPlaceholder = 'Enter the reason description';
  protected buttonCancleName = 'Cancel';
  protected buttonSubmitName = 'Submit a removal request';

  ngAfterViewInit(): void {
    this.registerMediator(this.buttonCancel);
    this.registerMediator(this.buttonSubmit);
    this.registerMediator(this.textBox);
    this.registerMediator(this.textarea);
    this.checkBoxes.forEach((checkBox) => {
      this.registerMediator(checkBox);
    });
  }

  private handleOnCheckBoxChange(widget: Widget) {
    const checkBox = this.checkBoxes.find((item) => item === widget);
    if (!checkBox) return;
    const select = checkBox.getState();

    if (select.checked) {
      select.name === 'Other'
        ? this.textarea.setDisabled(false)
        : this.textarea.setDisabled(true);

      this.buttonSubmit.setDisabled(false);
    } else {
      this.buttonSubmit.setDisabled(true);
      this.textarea.setDisabled(true);
    }
  }

  private handleOnCancelClick(widget: Widget) {
    if (widget !== this.buttonCancel) return;
    this.close.emit();
  }

  private handleOnSubmitClick(widget: Widget) {
    if (widget !== this.buttonSubmit) return;
    this.close.emit();
  }

  private handleOnTextareaChange(widget: Widget) {
    if (widget === this.textarea) {
      const text = this.textarea.getState();
      if (text.trim().length > 10) {
        this.textarea.setStatus('danger');
        this.buttonSubmit.setDisabled(true);
      } else {
        this.textarea.setStatus('basic');
        this.buttonSubmit.setDisabled(false);
      }
    }
  }

  widgetChanged(widget: Widget) {
    this.handleOnCheckBoxChange(widget);
    this.handleOnTextareaChange(widget);
    this.handleOnCancelClick(widget);
    this.handleOnSubmitClick(widget);
  }

  registerMediator(widget: Widget): void {
    widget.mediator = this;
  }
}
