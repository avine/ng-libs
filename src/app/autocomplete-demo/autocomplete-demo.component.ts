import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-demo',
  templateUrl: './autocomplete-demo.component.html',
  styleUrls: ['./autocomplete-demo.component.scss'],
})
export class AutocompleteDemoComponent {
  value = 'ello';

  datalist = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  minLength = 0;

  formGroup = this.fb.group({
    list: ['wor'],
  });

  constructor(private fb: FormBuilder) {}
}
