import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RxDataStore } from '@avine/rx-data-store';

import { getTodosByUserId, updateTodoStatusById } from '../server/todo.api';
import { cloneTodos, findTodoIndexById } from '../server';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent {
  dataStore = new RxDataStore(getTodosByUserId);

  constructor() {
    this.dataStore.map = cloneTodos;
  }

  fetch() {
    this.dataStore.fetch(1);
  }

  update() {
    this.dataStore.pending();
    updateTodoStatusById(3, true).subscribe((success) => {
      if (!success) {
        return;
      }
      this.dataStore.update((todos) => {
        const index = findTodoIndexById(todos, 3);
        todos[index].completed = true;
        return todos;
      });
    });
  }
}
