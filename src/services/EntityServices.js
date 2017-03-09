import rest from './REST';
import Todo from '../domain/Todo'
import { TodoActions } from '../actions/ActionTypes';

let todoService = rest( "/todos", TodoActions, ( data )=>{ return new Todo( data) });

export { todoService }

