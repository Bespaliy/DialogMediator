import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public showDialog = false;
  public showDialog2 = false;

  handleOnShowDialog() {
    this.showDialog = true;
  }

  handleOnShowDialog2() {
    this.showDialog2 = true;
  }
}
