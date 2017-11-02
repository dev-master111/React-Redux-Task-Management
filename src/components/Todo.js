import React from 'react';
import PropTypes from 'prop-types';
import './Style.css';
import AddTodo from '../containers/AddTodo'

const Todo = ({ onClick, onRemoveClick, editable, complete, title, onClickEdit, _id }) => (
  <li className="todo-title">
    <span
      onClick={onClick}
      style={
        {
          textDecoration: complete ? 'line-through' : 'none',
          color: complete ? '#ff0000' : '#00ff00',
          display: editable === undefined || !editable ? 'inline-block' : 'none'
        }
      }>
      {title}
    </span>
    <AddTodo isEditMode={true} visible={editable} text={title} todoId={_id} />
    <span
      onClick={e => {
        e.preventDefault()
        onRemoveClick()
      }}>
      <i className="fa fa-trash red"></i>
    </span>
    <span
      onClick={e => {
        e.preventDefault()
        console.log(editable)
        onClickEdit()
      }}>
      <i className="fa fa-edit green"></i>
    </span>
  </li>
);

Todo.propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  complete: PropTypes.bool.isRequired,
  title: PropTypes.string,
  _id: PropTypes.string.isRequired
};

export default Todo;