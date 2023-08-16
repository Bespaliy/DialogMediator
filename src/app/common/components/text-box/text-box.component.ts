import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Widget } from '../../abstractions/base-component.component';

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent extends Widget {
  @Input() content: string[] = [];

  constructor() {
    super();
  }
}
