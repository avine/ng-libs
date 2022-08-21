import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoComponent {
  datalist = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  inputMinLength = 0;

  text = 'ello';
}
