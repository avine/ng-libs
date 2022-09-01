import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-cascade',
  templateUrl: './cascade.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CascadeComponent {
  inputMinLength = 0;

  technos = ['HTML', 'CSS', 'JavaScript'];

  fruits = ['apples'];

  selectedList: 'technos' | 'fruits' = 'technos';

  selectedValue = '';

  get nextList() {
    return this.selectedList === 'technos' ? 'fruits' : 'technos';
  }
}
