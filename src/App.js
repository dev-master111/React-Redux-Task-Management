import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import todoApp from './store/reducers';
import { Provider } from 'react-redux';
import Main from './components/Main';

import createSagaMiddleware from 'redux-saga';
import todoSaga from './store/sagaReducers';

let sagaMiddleware = createSagaMiddleware();
let store = createStore(todoApp, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(todoSaga);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Provider store={store}>
          <Main />
        </Provider>
      </div>
    );
  }
}

export default App;
