import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogBoxComponent } from '../../components/confirm-dialog-box/confirm-dialog-box.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ChangePasswordDialogBoxComponent } from '../../components/change-password-dialog-box/change-password-dialog-box.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ConfirmDialogBoxComponent,
    MainRoutingModule,
    ChangePasswordDialogBoxComponent,
  ],
})
export class MainModule {}
