import { SearchActions } from '../actions/ActionTypes';
import axios from 'axios';
import Todo from '../domain/Todo';

export function todoSearchByTitleOrDescription( dispatch )
{

   function getPaging( paging )
   {
      paging = paging || {};
      return {
         offset: paging.offset || 0,
         limit: paging.limit || 10,
         sort: paging.sort || 'id',
         direction: paging.direction || 'asc'
      }
   }

   return ( query, paging ) =>
   {
      console.log(`Todo search for: ${query}`);
      dispatch({ type: SearchActions.TODO_SEARCH, payload: query });

      paging = getPaging( paging );
      let params = { ...paging, query: query };
      axios.get( '/todos/search', { params: params } )
         .then( (resp) => {
            dispatch({
               type: SearchActions.TODO_SEARCH_SUCCESS,
               payload: {
                  paging: paging,
                  query: query,
                  total: resp.data.count,
                  list: resp.data.items.map( (data)=>{ return new Todo( data ) })
               }
            })
         } )
         .catch(( err ) =>
         {
            dispatch({type: SearchActions.TODO_SEARCH_FAIL, payload: err})
         })
   }
}