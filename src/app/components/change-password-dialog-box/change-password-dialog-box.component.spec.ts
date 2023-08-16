import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordDialogBoxComponent } from './change-password-dialog-box.component';

describe('ChangePasswordDialogBoxComponent', () => {
  let component: ChangePasswordDialogBoxComponent;
  let fixture: ComponentFixture<ChangePasswordDialogBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangePasswordDialogBoxComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
