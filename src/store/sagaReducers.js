import { call, put, takeLatest } from 'redux-saga/effects';
import { loadTodosCall, addTodoCall, deleteTodoCall, updateTodoCall } from './hooks';
import { 
    LOAD_TODO_SUCCESS,
    LOAD_TODO_FAILURE,
    LOAD_TODO, ADD_TODO,
    ADD_TODO_SUCCESS,
    ADD_TODO_FAILURE,
    REMOVE_TODO,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE,
    UPDATE_TODO,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE } from './actions';

function* fetchTodos(action) {
    try {
        const todos = yield call(loadTodosCall);
        yield put({ type:LOAD_TODO_SUCCESS, todos });
    } catch (error) {
        yield put({ type:LOAD_TODO_FAILURE, error });
    }
}

function* addTodo(action) {
    try {
        const todo = yield call(addTodoCall, action.title);
        yield put({ type:ADD_TODO_SUCCESS, todo })
    } catch (error) {
        yield put({ type:ADD_TODO_FAILURE, error })
    }
}

function* deleteTodo(action) {
    try {
        const todo = yield call(deleteTodoCall, action.id);
        const id = todo._id;
        yield put({ type:DELETE_TODO_SUCCESS, id })
    } catch (error) {
        yield put({ type:DELETE_TODO_FAILURE, error })
    }
}

function* updateTodo(action) {
    try {
        const todo = yield call(updateTodoCall, action.id, action.title, action.complete);
        console.log(todo);
        yield put({ type:UPDATE_TODO_SUCCESS, todo })
    } catch (error) {
        yield put({ type:UPDATE_TODO_FAILURE, error })
    }
}

function* todoSaga() {
    yield takeLatest(LOAD_TODO, fetchTodos);
    yield takeLatest(ADD_TODO, addTodo);
    yield takeLatest(REMOVE_TODO, deleteTodo);
    yield takeLatest(UPDATE_TODO, updateTodo);
}

export default todoSaga;