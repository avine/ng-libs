import { Todo } from './todo.types';

let id = 0;

export const getId = () => ++id;

export let todosDB: Todo[] = [
  {
    userId: 1,
    id: getId(),
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: getId(),
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
  {
    userId: 1,
    id: getId(),
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: getId(),
    title: 'et porro tempora',
    completed: true,
  },
  {
    userId: 1,
    id: getId(),
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
  {
    userId: 2,
    id: getId(),
    title: 'qui ullam ratione quibusdam voluptatem quia omnis',
    completed: false,
  },
  {
    userId: 2,
    id: getId(),
    title: 'illo expedita consequatur quia in',
    completed: false,
  },
  {
    userId: 2,
    id: getId(),
    title: 'quo adipisci enim quam ut ab',
    completed: true,
  },
  {
    userId: 2,
    id: getId(),
    title: 'molestiae perspiciatis ipsa',
    completed: false,
  },
  {
    userId: 3,
    id: getId(),
    title: 'illo est ratione doloremque quia maiores aut',
    completed: true,
  },
  {
    userId: 3,
    id: getId(),
    title: 'vero rerum temporibus dolor',
    completed: true,
  },
  {
    userId: 3,
    id: getId(),
    title: 'ipsa repellendus fugit nisi',
    completed: true,
  },
  {
    userId: 3,
    id: getId(),
    title: 'et doloremque nulla',
    completed: false,
  },
  {
    userId: 3,
    id: getId(),
    title: 'repellendus sunt dolores architecto voluptatum',
    completed: true,
  },
  {
    userId: 3,
    id: getId(),
    title: 'ab voluptatum amet voluptas',
    completed: true,
  },
  {
    userId: 4,
    id: getId(),
    title: 'accusamus eos facilis sint et aut voluptatem',
    completed: true,
  },
  {
    userId: 4,
    id: getId(),
    title: 'quo laboriosam deleniti aut qui',
    completed: true,
  },
  {
    userId: 4,
    id: getId(),
    title: 'dolorum est consequatur ea mollitia in culpa',
    completed: false,
  },
  {
    userId: 4,
    id: getId(),
    title: 'molestiae ipsa aut voluptatibus pariatur dolor nihil',
    completed: true,
  },
  {
    userId: 4,
    id: getId(),
    title: 'ullam nobis libero sapiente ad optio sint',
    completed: true,
  },
  {
    userId: 5,
    id: getId(),
    title: 'suscipit repellat esse quibusdam voluptatem incidunt',
    completed: false,
  },
  {
    userId: 5,
    id: getId(),
    title: 'distinctio vitae autem nihil ut molestias quo',
    completed: true,
  },
  {
    userId: 5,
    id: getId(),
    title: 'et itaque necessitatibus maxime molestiae qui quas velit',
    completed: false,
  },
];
