import React from 'react';
import { connect } from 'react-redux';
import { addTodo, updateTodo, editTodo } from '../store/actions';

let AddTodo = ({dispatch, isEditMode, visible, text, todoId}) => {
  let input;
  let buttonTitle = !isEditMode ? 'Add Todo' : 'Done';
  return (
    <div 
      style={
        {
          display: visible ? 'inline-block' : 'none'
        }
      }>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          if (!isEditMode) {
            dispatch(addTodo(input.value))
            input.value = ''
            return
          }
          dispatch(updateTodo(todoId, input.value, null))
          dispatch(editTodo(todoId))
        }}
      >
        <input
          ref={node => {
            input = node
          }} 
          className="add-todo"
          defaultValue ={text}
        />
        <button type="submit" className="add-todo">
          { buttonTitle }
        </button>
      </form>
    </div>
  )
};

AddTodo = connect()(AddTodo);

export default AddTodo;
