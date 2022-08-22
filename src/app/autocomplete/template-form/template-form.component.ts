import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['../autocomplete.component.scss'],
})
export class TemplateFormComponent {
  datalist = ['Hello', 'Hel', 'Hello wor', 'Hello world!'];

  inputMinLength = 0;

  text = 'wor';
}
