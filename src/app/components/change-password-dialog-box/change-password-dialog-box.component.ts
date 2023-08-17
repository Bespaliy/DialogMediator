import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxMediatorInterface } from '../../common/interfaces/dialog-box-mediator.interface';
import { ButtonComponent } from '../../common/components/button/button.component';
import { CheckBoxComponent } from '../../common/components/check-box/check-box.component';
import { TextBoxComponent } from '../../common/components/text-box/text-box.component';
import { TextareaComponent } from '../../common/components/textarea/textarea.component';
import { InputComponent } from '../../common/components/input/input.component';
import { WidgetAbstract } from '../../common/abstract-classes/widget.abstract';
import { Validator } from '../../common/utils/validator.util';
import { LoaderComponent } from '../../common/components/loader/loader.component';

@Component({
  selector: 'app-change-password-dialog-box',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CheckBoxComponent,
    TextBoxComponent,
    TextareaComponent,
    InputComponent,
    LoaderComponent,
  ],
  templateUrl: './change-password-dialog-box.component.html',
  styleUrls: [
    '../confirm-dialog-box/confirm-dialog-box.component.scss',
    './change-password-dialog-box.component.scss',
  ],
})
export class ChangePasswordDialogBoxComponent
  implements DialogBoxMediatorInterface, AfterViewInit
{
  @ViewChild('new') private inputNew!: InputComponent;
  @ViewChild('repeat') private inputRepeat!: InputComponent;
  @ViewChild('showNew') private checkBoxShowNew!: CheckBoxComponent;
  @ViewChild('showRepeat')
  private checkBoxShowRepeat!: CheckBoxComponent;
  @ViewChild('submit') private buttonSubmit!: ButtonComponent;
  @ViewChild('cancel') private buttonCancel!: ButtonComponent;
  @ViewChild('loader') private loader!: LoaderComponent;

  @Output() close = new EventEmitter<void>();

  ngAfterViewInit(): void {
    this.registerMediator(this.buttonSubmit);
    this.registerMediator(this.buttonCancel);
    this.registerMediator(this.inputNew);
    this.registerMediator(this.inputRepeat);
    this.registerMediator(this.checkBoxShowNew);
    this.registerMediator(this.checkBoxShowRepeat);
    this.registerMediator(this.loader);
  }

  private handleShowNewPassword(widget: WidgetAbstract) {
    if (this.checkBoxShowNew !== widget) return;
    const { checked } = this.checkBoxShowNew.getState();
    this.inputNew.setType(checked ? 'text' : 'password');
  }

  private handleShowRepeatPassword(widget: WidgetAbstract) {
    if (this.checkBoxShowRepeat !== widget) return;
    const { checked } = this.checkBoxShowRepeat.getState();
    this.inputRepeat.setType(checked ? 'text' : 'password');
  }

  private handleNewPasswordInput(widget: WidgetAbstract) {
    if (this.inputNew !== widget) return;
    const newPassword = this.inputNew.getState();
    const repeatPassword = this.inputRepeat.getState();

    const isNotEmpty = Validator.required(newPassword);

    this.inputNew.setStatus(isNotEmpty ? 'basic' : 'danger');

    const isEqual = Validator.compare(newPassword, repeatPassword);

    this.inputRepeat.setStatus(isEqual ? 'basic' : 'danger');
    this.buttonSubmit.setDisabled(!isEqual);
  }

  private handleRepeatPasswordInput(widget: WidgetAbstract) {
    if (this.inputRepeat !== widget) return;
    const repeatPassword = this.inputRepeat.getState();
    const newPassword = this.inputNew.getState();

    const isEqual = Validator.compare(newPassword, repeatPassword);

    this.buttonSubmit.setDisabled(!isEqual);
    this.inputRepeat.setStatus(isEqual ? 'basic' : 'danger');
  }

  private handleOnCancelClick(widget: WidgetAbstract) {
    if (widget !== this.buttonCancel) return;
    this.close.emit();
  }

  private handleOnSubmitClick(widget: WidgetAbstract) {
    if (widget !== this.buttonSubmit) return;
    this.loader.setActive(true);
  }

  widgetChanged(widget: WidgetAbstract): void {
    this.handleNewPasswordInput(widget);
    this.handleRepeatPasswordInput(widget);
    this.handleOnCancelClick(widget);
    this.handleOnSubmitClick(widget);
    this.handleShowNewPassword(widget);
    this.handleShowRepeatPassword(widget);
  }

  registerMediator(widget: WidgetAbstract): void {
    widget.mediator = this;
  }
}
