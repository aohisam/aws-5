// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Person, Board, Todo } = initSchema(schema);

export {
  Person,
  Board,
  Todo
};