export const TodoActions = Object.freeze({
   SAVE_REQUEST: 'TODO_SAVE_REQUEST',
   UPDATE_REQUEST: 'TODO_UPDATE_REQUEST',
   SAVE_SUCCESS: 'TODO_SAVE_SUCCESS',
   SAVE_ERROR: 'TODO_SAVE_ERROR',
   CREATE_NEW: 'TODO_CREATE_NEW',
   PROPERTY_UPDATED: 'TODO_PROPERTY_UPDATED',
   RESET_ALERTS: 'TODO_RESET_ALERTS',
   CLEAR_ALL: 'TODO_CLEAR_ALL',
   GET_LIST_REQUEST: 'TODO_GET_ALL_REQUEST',
   GET_LIST_SUCCESS: 'TODO_GET_ALL_SUCCESS',
   GET_LIST_ERROR: 'TODO_GET_ALL_ERROR',
   GET_ONE_REQUEST: 'TODO_GET_ONE_REQUEST',
   GET_ONE_SUCCESS: 'TODO_GET_ONE_SUCCESS',
   GET_ONE_ERROR: 'TODO_GET_ONE_ERROR',
   DELETE_REQUEST: 'TODO_DELETE_REQUEST',
   DELETE_SUCCESS: 'TODO_DELETE_SUCCESS',
   DELETE_ERROR: 'TODO_DELETE_ERROR',
   SELECTED: 'TODO_SELECTED',
   SELECTION_CLEARED: 'TODO_SELECTION_CLEARED'
});

export const UserActions = Object.freeze({
   SAVE_REQUEST: 'USER_SAVE_REQUEST',
   UPDATE_REQUEST: 'USER_UPDATE_REQUEST',
   SAVE_SUCCESS: 'USER_SAVE_SUCCESS',
   SAVE_ERROR: 'USER_SAVE_ERROR',
   CREATE_NEW: 'USER_CREATE_NEW',
   PROPERTY_UPDATED: 'USER_PROPERTY_UPDATED',
   RESET_ALERTS: 'USER_RESET_ALERTS',
   CLEAR_ALL: 'USER_CLEAR_ALL',
   GET_LIST_REQUEST: 'USER_GET_ALL_REQUEST',
   GET_LIST_SUCCESS: 'USER_GET_ALL_SUCCESS',
   GET_LIST_ERROR: 'USER_GET_ALL_ERROR',
   GET_ONE_REQUEST: 'USER_GET_ONE_REQUEST',
   GET_ONE_SUCCESS: 'USER_GET_ONE_SUCCESS',
   GET_ONE_ERROR: 'USER_GET_ONE_ERROR',
   DELETE_REQUEST: 'USER_DELETE_REQUEST',
   DELETE_SUCCESS: 'USER_DELETE_SUCCESS',
   DELETE_ERROR: 'USER_DELETE_ERROR',
});


export const SearchActions = Object.freeze({
   TODO_SEARCH: 'TODO_SEARCH',
   TODO_SEARCH_SUCCESS: 'TODO_SEARCH_SUCCESS',
   TODO_SEARCH_FAIL: 'TODO_SEARCH_FAIL',
   TODO_SEARCH_CLEAR: 'TODO_SEARCH_CLEAR',
});

export const SessionActions = Object.freeze({
   LOGIN_REQUEST: 'LOGIN_REQUEST',
   LOGIN_SUCCESS: 'LOGIN_SUCCESS',
   LOGIN_FAIL: 'LOGIN_FAIL',
   GET_CURRENT_USER_REQUEST: 'GET_CURRENT_USER_REQUEST',
   GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
   GET_CURRENT_USER_FAIL: 'GET_CURRENT_USER_FAIL',
   SESSION_TIMEOUT: 'SESSION_TIMEOUT',
});

export const AlertActions = Object.freeze({
   NEW_ALERT: 'NEW_ALERT',
   CLEAR_ALERTS: 'CLEAR_ALERTS',
   CLEAR_ALERT: 'CLEAR_ALERT'
});
