
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_FILTER = 'SET_FILTER';
export const EDIT_TODO = 'EDIT_TODO';

// Load Todo Action Types
export const LOAD_TODO = 'LOAD_TODO';
export const LOAD_TODO_SUCCESS = 'LOAD_TODO_SUCCESS';
export const LOAD_TODO_FAILURE = 'LOAD_TODO_FAILURE';

// Add Todo Action Types
export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

// Delete Todo Action Types
export const REMOVE_TODO = 'REMOVE_TODO';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

// Update Todo Action Types
export const UPDATE_TODO = 'UPDATE_TODO';
export const UPDATE_TODO_SUCCESS = 'EDIT_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'EDIT_TODO_FAILURE';

export const availableFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export function addTodo(title) {
  return { type: ADD_TODO, title };
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id }
}

export function editTodo(id) {
  return { type: EDIT_TODO, id }
}

export function updateTodo(id, title, complete) {
  return { type: UPDATE_TODO, id, title, complete }
}

export function removeTodo(id) {
  return { type: REMOVE_TODO, id }
}

export function setFilter(filter) {
  return { type: SET_FILTER, filter }
}

export function loadTodos() {
  return { type: LOAD_TODO }
}