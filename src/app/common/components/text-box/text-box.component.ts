import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetAbstract } from '../../abstract-classes/widget.abstract';

@Component({
  selector: 'app-text-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
})
export class TextBoxComponent extends WidgetAbstract {
  @Input() content: string[] = [];

  override getState() {
    return this.content;
  }
}
