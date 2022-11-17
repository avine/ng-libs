import { Injectable } from '@angular/core';
import { RxDataStore } from '@avine/rx-data-store';

import { addTodo, cloneTodos, findTodoIndexById, getTodosByUserId, removeTodoById, Todo, updateTodo } from '../server';

@Injectable({
  providedIn: 'root',
})
export class DemoService extends RxDataStore<Todo[], [userId: number]> {
  constructor() {
    super(getTodosByUserId);
    this.map = cloneTodos;
  }

  update(todo: Todo) {
    this.mutationQueue(updateTodo(todo), (todos, updatedTodo) => {
      const index = findTodoIndexById(todos, updatedTodo.id);
      todos[index] = updatedTodo;
      return todos;
    });
  }

  remove(id: number) {
    this.mutationQueue(removeTodoById(id), (todos) => {
      const index = findTodoIndexById(todos, id);
      todos.splice(index, 1);
      return todos;
    });
  }

  add(todo: Omit<Todo, 'id'>) {
    this.mutationQueue(addTodo(todo), (todos, newTodo) => {
      todos.push(newTodo);
      return todos;
    });
  }
}
