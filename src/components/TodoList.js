import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

class TodoList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { onLoad } = this.props;
    onLoad();
  }

  render() {
    const { todos, onTodoClick, onTodoRemoveClick, onTodoClickEdit } = this.props;
    return (
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} {...todo} 
                onClick={() => onTodoClick(todo._id, todo.complete)}
                onRemoveClick={() => onTodoRemoveClick(todo._id)} 
                onClickEdit={() => onTodoClickEdit(todo._id)} />
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.string,
      complete: PropTypes.bool.isRequired,
      title: PropTypes.string
    }).isRequired
  ),
  onTodoClick: PropTypes.func.isRequired,
  onTodoRemoveClick: PropTypes.func.isRequired,
  onTodoClickEdit: PropTypes.func,
  onLoad: PropTypes.func.isRequired
};

export default TodoList;



