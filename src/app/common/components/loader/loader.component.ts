import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetAbstract } from '../../abstract-classes/widget.abstract';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent extends WidgetAbstract {
  public _active = false;
  @Input() set active(active: boolean) {
    this._active = active;
  }

  get active() {
    return this._active;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  override getState(): any {
    this.active;
  }
}
