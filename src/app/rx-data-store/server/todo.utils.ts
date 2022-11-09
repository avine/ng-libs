import { Todo } from './todo.types';

export const cloneTodos = (todos: Todo[]): Todo[] => [...todos.map((todo) => ({ ...todo }))];

export const findTodoIndexById = (todos: Todo[], todoId: number) => todos.findIndex(({ id }) => id === todoId);
