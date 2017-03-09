import { SessionActions as action} from '../actions/ActionTypes';
import axios from 'axios';
import LoginResponse from '../domain/LoginResponse';
import User from '../domain/User';


export function loginAction( dispatch )
{
   return ( username, password )=>
   {
      dispatch({ type: action.LOGIN_REQUEST, payload: username });
      axios.post( '/login', { username: username, password: password } )
         .then( (resp) => {
            dispatch({ type: action.LOGIN_SUCCESS, payload: new LoginResponse( resp.data) });
         })
         .catch( (err) => {
            dispatch({ type: action.LOGIN_FAIL, payload: new LoginResponse( err.response.data) });
         });
   }
}

export function getCurrentUser( dispatch )
{
   return () =>
   {
      dispatch({ type: action.GET_CURRENT_USER_REQUEST });
      axios.get('/users')
         .then( ( resp )=>{
            dispatch({ type: action.GET_CURRENT_USER_SUCCESS, payload: new User( resp.data ) })
         })
         .catch( (err) => {
            dispatch({ type: action.GET_CURRENT_USER_FAIL, payload: err.response.data });
         });
   }
}