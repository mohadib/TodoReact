import { SearchActions } from '../actions/ActionTypes';

export default function ( state, action )
{

   state = state || {
         list: {
            todos: [],
            query: null,
            offset: null,
            limit: null,
            sort: null,
            direction: null,
            total: null,
            fetching: false,
            err: null
         }
      };


   if( action.type === SearchActions.TODO_SEARCH )
   {
      return { list:{ ...state.list, fetching: true, query: action.payload } };
   }
   else if( action.type === SearchActions.TODO_SEARCH_FAIL )
   {
      return { list:{ ...state.list, fetching: false, err: action.payload, todos:[] } };
   }
   else if( action.type === SearchActions.TODO_SEARCH_CLEAR )
   {
      return {
         list: {
            todos: [],
            query: null,
            offset: null,
            limit: null,
            sort: null,
            direction: null,
            total: null,
            fetching: false,
            err: null
         }
      };
   }
   else if( action.type === SearchActions.TODO_SEARCH_SUCCESS )
   {
      return {
         list: {
            ...state.list,
            todos: action.payload.list,
            offset: action.payload.paging.offset,
            limit: action.payload.paging.limit,
            sort: action.payload.paging.sort,
            direction: action.payload.paging.direction,
            total: action.payload.total,
            fetching: false,
            err: null
         }
      }
   }

   return state;
}