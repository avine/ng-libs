import { delay, map, Observable, of, throwError } from 'rxjs';
import { getId, todosDB } from './todo.db';

import { Todo } from './todo.types';
import { cloneTodos, findTodoIndexById } from './todo.utils';

const DELAY = 2000;

export const getTodosByUserId = (userId: number): Observable<Todo[]> => {
  return of(cloneTodos(todosDB)).pipe(
    map((todos) => todos.filter((todo) => todo.userId === userId)),
    delay(DELAY)
  );
};

export const addTodo = (todo: Omit<Todo, 'id'>): Observable<Todo> => {
  const id = getId();
  todosDB.push({ ...todo, id });
  return of({ ...todo, id }).pipe(delay(DELAY));
};

export const updateTodo = (todo: Todo): Observable<Todo> => {
  const index = findTodoIndexById(todosDB, todo.id);
  if (index === -1) {
    return throwError(() => new Error(`Unable to update todo with id=${todo.id}`)).pipe(delay(DELAY));
  }
  const { title, completed } = todo;
  todosDB[index] = { ...todosDB[index], title, completed };
  return of({ ...todosDB[index], title, completed }).pipe(delay(DELAY));
};

export const removeTodoById = (id: number): Observable<Todo> => {
  const index = findTodoIndexById(todosDB, id);
  if (index === -1) {
    return throwError(() => new Error(`Unable to remove todo with id=${id}`)).pipe(delay(DELAY));
  }
  const [todo] = todosDB.splice(index, 1);
  return of(todo).pipe(delay(DELAY));
};
