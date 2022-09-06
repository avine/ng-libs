import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { AUTOCOMPLETE_DIRECTIVES } from '@avine/ng-autocomplete';

@Component({
  standalone: true,
  imports: [CommonModule, OverlayModule, ...AUTOCOMPLETE_DIRECTIVES],
  selector: 'app-cascade',
  templateUrl: './cascade.component.html',
  styleUrls: ['../autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CascadeComponent {
  inputMinLength = 0;

  technos = ['HTML', 'CSS', 'JavaScript'];

  fruits = ['Apples'];

  selectedList: 'technos' | 'fruits' = 'technos';

  selectedValue = '';

  get nextList() {
    return this.selectedList === 'technos' ? 'fruits' : 'technos';
  }

  changeList() {
    this.selectedList = this.nextList;
    if (this[this.selectedList].length === 1) {
      this.selectedValue = this[this.selectedList][0];
    } else {
      this.selectedValue = '';
    }
  }
}
