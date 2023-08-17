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
    this.showDialog2 = false;
  }

  handleOnShowDialog2() {
    this.showDialog2 = true;
    this.showDialog = false;
  }
}
