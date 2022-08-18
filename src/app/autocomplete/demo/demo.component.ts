import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  value = 'ello';

  datalist = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  minLength = 0;

  formGroup = this.fb.group({
    list: ['wor'],
  });

  constructor(private fb: FormBuilder) {}
}
