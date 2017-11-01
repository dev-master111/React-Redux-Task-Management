import React from 'react';
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Footer from './Footer';

const Main = () => (
  <div>
    <AddTodo visible={true} />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default Main;