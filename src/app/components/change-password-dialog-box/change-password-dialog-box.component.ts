import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBoxMediator } from '../../common/abstractions/dialog-box.mediator';
import { ButtonComponent } from '../../common/components/button/button.component';
import { CheckBoxComponent } from '../../common/components/check-box/check-box.component';
import { TextBoxComponent } from '../../common/components/text-box/text-box.component';
import { TextareaComponent } from '../../common/components/textarea/textarea.component';
import { InputComponent } from '../../common/components/input/input.component';
import { Widget } from '../../common/abstractions/base-component.component';

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
  ],
  templateUrl: './change-password-dialog-box.component.html',
  styleUrls: [
    '../confirm-dialog-box/confirm-dialog-box.component.scss',
    './change-password-dialog-box.component.scss',
  ],
  providers: [ButtonComponent]
})
export class ChangePasswordDialogBoxComponent
  implements DialogBoxMediator, AfterViewInit
{
  @ViewChild('new') private inputNew!: InputComponent;
  @ViewChild('repeat') private inputRepeat!: InputComponent;
  @ViewChild('showNew') private checkBoxShowNew!: CheckBoxComponent;
  @ViewChild('showRepeat')
  private checkBoxShowRepeat!: CheckBoxComponent;
  @ViewChild('submit') private buttonSubmit!: ButtonComponent;
  @ViewChild('cancel') private buttonCancel!: ButtonComponent;

  @Output() close = new EventEmitter<void>();

  protected inputNewPlaceHolder = 'Enter new password';
  protected inputRepeatPlaceHolder = 'Repeat password';
  protected buttonCancleName = 'Cancel';
  protected buttonSubmitName = 'Submit';

  ngAfterViewInit(): void {
    this.registerMediator(this.buttonSubmit);
    this.registerMediator(this.buttonCancel);
    this.registerMediator(this.inputNew);
    this.registerMediator(this.inputRepeat);
    this.registerMediator(this.checkBoxShowNew);
    this.registerMediator(this.checkBoxShowRepeat);
  }

  private handleShowNewPassword(widget: Widget) {
    if (this.checkBoxShowNew !== widget) return;
    const { checked } = this.checkBoxShowNew.getState();
    if (checked) this.inputNew.setType('text');
    else this.inputNew.setType('password');
  }

  private handleShowRepeatPassword(widget: Widget) {
    if (this.checkBoxShowRepeat !== widget) return;
    const { checked } = this.checkBoxShowRepeat.getState();
    if (checked) this.inputRepeat.setType('text');
    else this.inputRepeat.setType('password');
  }

  private handleNewPasswordInput(widget: Widget) {
    if (this.inputNew !== widget) return;
    const newPassword = this.inputNew.getState();
    const repeatPassword = this.inputRepeat.getState();
    if (newPassword.trim().length === 0) {
      this.inputNew.setStatus('danger');
    } else {
      this.inputNew.setStatus('basic');
    }

    if (repeatPassword != newPassword) {
      this.inputRepeat.setStatus('danger');
      this.buttonSubmit.setDisabled(true);
    } else {
      this.buttonSubmit.setDisabled(false);
      this.inputRepeat.setStatus('basic');
    }
  }

  private handleRepeatPasswordInput(widget: Widget) {
    if (this.inputRepeat !== widget) return;
    const repeatPassword = this.inputRepeat.getState();
    const newPassword = this.inputNew.getState();
    if (repeatPassword.trim().length === 0) {
      this.inputRepeat.setStatus('danger');
    } else {
      this.inputRepeat.setStatus('basic');
    }

    if (repeatPassword != newPassword) {
      this.inputRepeat.setStatus('danger');
      this.buttonSubmit.setDisabled(true);
    } else {
      this.buttonSubmit.setDisabled(false);
      this.inputRepeat.setStatus('basic');
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

  widgetChanged(widget: Widget): void {
    this.handleNewPasswordInput(widget);
    this.handleRepeatPasswordInput(widget);
    this.handleOnCancelClick(widget);
    this.handleOnSubmitClick(widget);
    this.handleShowNewPassword(widget);
    this.handleShowRepeatPassword(widget);
  }
  
  registerMediator(widget: Widget): void {
    widget.mediator = this;
  }
}
