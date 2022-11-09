import { delay, map, of } from 'rxjs';
import { getId, todosDB } from './todo.db';

import { Todo } from './todo.types';
import { cloneTodos, findTodoIndexById } from './todo.utils';

export const getTodosByUserId = (userId: number) => {
  console.log('Get todos by userId', userId);

  return of(cloneTodos(todosDB)).pipe(
    map((todos) => todos.filter(({ userId: id }) => id === userId)),
    delay(500)
  );
};

export const updateTodoStatusById = (id: number, completed: boolean) => {
  const index = findTodoIndexById(todosDB, id);
  if (index === -1) {
    console.error('Unable to update todo by id', id);
    return of(false).pipe(delay(500));
  }

  console.log('Update todo by id', { ...todosDB[index], completed });
  todosDB[index] = { ...todosDB[index], completed };
  return of(true).pipe(delay(500));
};

export const removeTodoById = (id: number) => {
  const index = findTodoIndexById(todosDB, id);
  if (index === -1) {
    console.error('Unable to remove todo by id', id);
    return of(false).pipe(delay(500));
  }

  console.log('Remove todo by id', id);
  todosDB.splice(index, 1);
  return of(true).pipe(delay(500));
};

export const addTodo = (todo: Omit<Todo, 'id'>) => {
  const id = getId();
  console.log('Add todo', { ...todo, id });
  todosDB.push({ ...todo, id });
  return of(id).pipe(delay(500));
};
