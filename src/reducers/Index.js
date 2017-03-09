import {combineReducers} from 'redux';
import crudReducer from './CrudReducer';
import {TodoActions, UserActions} from '../actions/ActionTypes';
import sessionReducer from '../reducers/SessionReducer';
import alertReducer from '../reducers/AlertReducer';
import todoSearchReducer from '../reducers/TodoSearchReducer';

export default combineReducers({
   todos: crudReducer('Todo', 'Todos', TodoActions),
   users: crudReducer('User', 'Users', UserActions),
   session: sessionReducer,
   alerts: alertReducer,
   searchTodos: todoSearchReducer
})