import { combineReducers } from 'redux';
import {
  TOGGLE_TODO,
  SET_FILTER,
  EDIT_TODO,
  LOAD_TODO_SUCCESS,
  LOAD_TODO_FAILURE,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  availableFilters
} from './actions';

const { SHOW_ALL } = availableFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case LOAD_TODO_SUCCESS:
      return action.todos;
    case ADD_TODO_SUCCESS:
      return [
        ...state,
        action.todo
      ];
    case DELETE_TODO_SUCCESS:
      return state.filter((todo, index) => action.id !== todo._id);
    // case TOGGLE_TODO:
    //   return state.map((todo, index) => {
    //     if (todo._id === action.id) {
    //       return Object.assign({}, todo, {
    //         complete: !todo.complete
    //       })
    //     }
    //     return todo;
    //   });
    case UPDATE_TODO_SUCCESS:
    return state.map((todo, index) => {
      if (todo._id === action.todo._id) {
        return Object.assign({}, todo, {
          complete: action.todo.complete,
          title: action.todo.title
        })
      }
      return todo;
    });
    case EDIT_TODO:
      return state.map((todo, index) => {
        if (todo._id === action.id) {
          if (todo.editable !== undefined) {
            return Object.assign({}, todo, {
                editable: !todo.editable,
            })
          } else {
            return { ...todo, editable: true }
          }
        }
        return todo;
      });
    case LOAD_TODO_FAILURE:
    case ADD_TODO_FAILURE:
    case DELETE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
      console.log(action.error);
      return state;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  filter: visibilityFilter,
  todos: todos
});

export default todoApp;