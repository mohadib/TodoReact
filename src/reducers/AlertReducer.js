import { AlertActions } from '../actions/ActionTypes';

export default function( state={ alert:null }, action)
{
   if( action.type === AlertActions.NEW_ALERT )
   {
      state = {...state, alert: action.payload }
   }
   else if( action.type === AlertActions.CLEAR_ALERT )
   {
      state = {...state, alert:null }
   }
   return state;
}