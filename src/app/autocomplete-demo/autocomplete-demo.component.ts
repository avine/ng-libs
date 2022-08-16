import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-demo',
  templateUrl: './autocomplete-demo.component.html',
  styleUrls: ['./autocomplete-demo.component.scss'],
})
export class AutocompleteDemoComponent {
  value = '';

  dataList = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  inputMinLengthToShowDataList = 0;

  formGroup = this.fb.group({
    list: [null],
  });

  constructor(private fb: FormBuilder) {}
}
