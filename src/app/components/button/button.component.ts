import {Component, Input} from '@angular/core';
import {on} from "@ngrx/store";

@Component({
  selector: 'app-button[text][onClick]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input()
  text: string = "";
  @Input()
  onClick: () => void = () => {};
  @Input()
  disabled?: boolean = false;
  protected readonly on = on;
}
