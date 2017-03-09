import { AlertActions } from '../actions/ActionTypes'

export function newErrorAlert( msg )
{
   return {
      type: AlertActions.NEW_ALERT,
      payload: {
         id: Math.random(),
         type: 'error',
         msg: msg
      }
   };
}

export function newInfomationAlert( msg) {
   return {
      type:AlertActions.NEW_ALERT,
      payload:{
         id: Math.random(),
         type: 'information',
         msg: msg
      }
   };
}

export function clearAlert( dispatch, state )
{
   return (id)=> {
      dispatch({ type:AlertActions.CLEAR_ALERT, payload:id });
   }
}

export function clearAllAlerts( dispatch, state )
{
   return (id)=> {
      dispatch({ type:AlertActions.CLEAR_ALERTS });
   }
}



