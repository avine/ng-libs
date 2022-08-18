import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss'],
})
export class Demo2Component {
  value = 'ello';

  datalist = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  minLength = 0;

  formGroup = this.fb.group({
    list: ['wor'],
  });

  constructor(private fb: FormBuilder) {}
}
