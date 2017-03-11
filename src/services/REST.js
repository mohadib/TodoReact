import axios from 'axios'
import {browserHistory} from 'react-router'
import {newInfomationAlert, newErrorAlert} from './AlertsService'


export default function ( urlBase, actionTypes, createFn )
{

   function deleteAction( dispatch )
   {
      return function ( id, callback )
      {
         console.log('delete action called in rest ' + urlBase);
         dispatch({type: actionTypes.DELETE_REQUEST, payload: id});
         axios.delete(urlBase + "/" + id)
            .then(( resp ) =>
            {
               dispatch({type: actionTypes.DELETE_SUCCESS, payload: id});
               dispatch(newInfomationAlert('Entity deleted'));
               if( callback !== undefined )
               {
                  callback.call();
               }
            })
            .catch(( err ) =>
            {
               dispatch({type: actionTypes.DELETE_ERROR, payload: err});
               dispatch(newErrorAlert(err.response.data.msg));
            });
      }
   }

   function saveAction( dispatch )
   {
      return function ( entity, callback )
      {
         console.log('save action called in rest ' + urlBase);
         dispatch({type: actionTypes.SAVE_REQUEST, payload: entity});
         axios.post(urlBase, entity)
            .then(( resp ) =>
            {
               dispatch({type: actionTypes.SAVE_SUCCESS, payload: createFn(resp.data)});
               dispatch(newInfomationAlert('Entity saved'));
               if( callback !== undefined )
               {
                  callback.call();
               }
               //browserHistory.push(urlBase)
            })
            .catch(( err ) =>
            {
               dispatch({type: actionTypes.SAVE_ERROR, payload: err});
               dispatch(newErrorAlert(err.response.data.msg));
            });
      }
   }

   function updateAction( dispatch )
   {
      return ( entity ) =>
      {
         console.log('update action called in rest ' + urlBase);
         dispatch({type: actionTypes.UPDATE_REQUEST, payload: entity});
         axios.patch(urlBase, entity)
            .then(( resp ) =>
            {
               dispatch({type: actionTypes.SAVE_SUCCESS, payload: createFn(resp.data)});
               dispatch(newInfomationAlert('Entity Saved'));
               //browserHistory.push(urlBase);
            })
            .catch(( err ) =>
            {
               dispatch({type: actionTypes.SAVE_ERROR, payload: err});
               dispatch(newErrorAlert(err.response.data.msg));
            });
      }
   }

   function getAll( dispatch )
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

      return ( paging ) =>
      {
         console.log('getAll action called in rest ' + urlBase);
         dispatch({type: actionTypes.GET_LIST_REQUEST});
         paging = getPaging( paging );
         axios.get(urlBase, { params: paging })
            .then(( resp ) =>
            {
               dispatch({
                  type: actionTypes.GET_LIST_SUCCESS,
                  payload: {
                     paging: paging,
                     total: resp.data.count,
                     list: resp.data.items.map(createFn)
                  }
               });
            })
            .catch(( err ) =>
            {
               dispatch({type: actionTypes.GET_LIST_ERROR, payload: err})
            })
      }
   }


   function getOne( dispatch )
   {
      return ( id ) =>
      {
         console.log('getOne action called in rest ' + urlBase);
         dispatch({type: actionTypes.GET_ONE_REQUEST});
         axios.get(urlBase + "/" + id)
            .then(( resp ) => dispatch({type: actionTypes.GET_ONE_SUCCESS, payload: createFn(resp.data)}))
            .catch(( err ) => dispatch({type: actionTypes.GET_ONE_ERROR, payload: err}))
      }
   }

   return Object.freeze({
      saveAction: saveAction,
      updateAction: updateAction,
      getAll: getAll,
      getOne: getOne,
      deleteAction: deleteAction
   });
}

