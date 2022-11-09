import { Injectable } from '@angular/core';
import { RxDataStore } from '@avine/rx-data-store';
import { tap } from 'rxjs';

import { cloneTodos, findTodoIndexById, getTodosByUserId, Todo, updateTodoStatusById } from '../server';

@Injectable({
  providedIn: 'root',
})
export class DemoV2Service {
  dataStore = new RxDataStore(getTodosByUserId);

  constructor() {
    this.dataStore.map = cloneTodos;
  }

  update(id: number, completed: boolean) {
    this.dataStore.pending();
    return updateTodoStatusById(id, completed).pipe(
      tap((success) => {
        if (!success) {
          return;
        }
        this.dataStore.update((todos) => {
          const index = findTodoIndexById(todos, 3);
          todos[index].completed = true;
          return todos;
        });
      })
    );
  }

  /*
  updateTodos(id: number, completed: boolean) {
    this.pending();
    updateTodoStatusById(id, completed).subscribe((success) => {
      if (!success) {
        return;
      }
      this.update((todos) => {
        const index = findTodoIndexById(todos, 3);
        todos[index].completed = true;
        return todos;
      });
    });
  }
  */
}
