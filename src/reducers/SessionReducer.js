import { SessionActions } from '../actions/ActionTypes';

export default function ( state={ user:null, message:null, fetchingCurrentUser:false, loggingIn:false, loginFailed:false }, action )
{
   if( action.type === SessionActions.LOGIN_SUCCESS )
   {
      return { ...state, user: action.payload.user, loggingIn:false, message:null, loginFailed:false };
   }
   else if( action.type === SessionActions.LOGIN_REQUEST )
   {
      return { ...state, loggingIn:true, message:null, loginFailed:false};
   }
   else if( action.type === SessionActions.LOGIN_FAIL )
   {
      return { ...state, message: action.payload.message, loggingIn:false, loginFailed:true };
   }
   else if( action.type === SessionActions.GET_CURRENT_USER_REQUEST )
   {
      return { ...state, fetchingCurrentUser:true };
   }
   else if( action.type === SessionActions.GET_CURRENT_USER_SUCCESS )
   {
      return { user: action.payload, message: '', fetchingCurrentUser:false };
   }
   else if( action.type === SessionActions.GET_CURRENT_USER_FAIL )
   {
      return { ...state, fetchingCurrentUser:false };
   }
   else if( action.type === SessionActions.SESSION_TIMEOUT )
   {
      return { user:null, message:null, fetchingCurrentUser:false };
   }

   return state;
}