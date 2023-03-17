import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DemoProp } from './demo-state.util';

@Component({
  selector: 'app-demo-state',
  standalone: true,
  imports: [JsonPipe, NgFor, NgIf],
  templateUrl: './demo-state.component.html',
  styleUrls: ['./demo-state.component.scss'],
})
export class DemoStateComponent<T> {
  @Input() state!: Record<keyof T, DemoProp<T[keyof T]>>;

  @Output() propChange = new EventEmitter<keyof T>();

  protected handleAction(prop: keyof T) {
    this.state[prop].next();
    this.propChange.emit(prop);
  }

  protected get actions() {
    return Object.keys(this.state).map((prop) => this.getPropState(prop as keyof T));
  }

  protected getPropState(prop: keyof T) {
    return {
      prop,
      value: this.state[prop].hideDetails && this.state[prop].value ? '...' : this.state[prop].value,
    };
  }
}
