import { connect } from 'react-redux';
import { toggleTodo, removeTodo, loadTodos, editTodo, updateTodo } from '../store/actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.complete);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.complete);
    default:
      return 'SHOW_ALL';
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: (id, complete) => {
      console.log(complete)
      dispatch(updateTodo(id, null, !complete))
      dispatch(toggleTodo(id))
    },
    onTodoRemoveClick: id => {
      dispatch(removeTodo(id))
    },
    onLoad: () => {
      dispatch(loadTodos())
    },
    onTodoClickEdit: id => {
      dispatch(editTodo(id))
    }
  }
};

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.filter)
  }
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;


