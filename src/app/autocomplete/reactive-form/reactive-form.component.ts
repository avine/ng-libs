import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReactiveFormComponent {
  datalist = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  inputMinLength = 0;

  formGroup = this.formBuilder.group({
    text: ['wor'],
  });

  constructor(private formBuilder: FormBuilder) {}
}
