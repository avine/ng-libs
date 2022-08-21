import { Component } from '@angular/core';

@Component({
  selector: 'app-standalone',
  templateUrl: './standalone.component.html',
  styleUrls: ['./standalone.component.scss'],
})
export class StandaloneComponent {
  datalist = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  inputMinLength = 0;

  text = 'ello';
}
