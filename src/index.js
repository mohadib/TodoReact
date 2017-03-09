import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import store from './store';
import axios from 'axios';
import { SessionActions } from './actions/ActionTypes';

axios.defaults.baseURL = '/api';

axios.interceptors.response.use(
   ( response ) =>{ return response; },
   ( error )=> {
      // look for 403, 401

      if( error.response.status !== 403 && error.response.status !== 401 )
      {
         return Promise.reject(error)
      }

      // if store is fetching current user or logging in do nothing
      if( store.getState().session.fetchingCurrentUser ||  store.getState().session.loggingIn )
      {
         return Promise.reject(error)
      }

      store.dispatch({ type: SessionActions.SESSION_TIMEOUT, payload:error });

      return Promise.reject(error);
   }
);

ReactDOM.render(
    <Provider store={ store } >
      <App/>
    </Provider>,
  document.getElementById('root')
);
