import * as axios from 'axios';

const config = {
    headers: {
        'Accept': 'application/json'
    }
};

export function loadTodosCall() {
  return axios.get('http://localhost:3000/todo', config)
    .then(response => response.data)
    .catch(err => { throw err});
}

export function addTodoCall(title) {
  return axios.post('http://localhost:3000/todo', { title }, config)
    .then(response => response.data)
    .catch(err => { throw err});
}

export function deleteTodoCall(id) {
  return axios.delete('http://localhost:3000/todo/' + id, config)
    .then(response => response.data)
    .catch(err => { throw err });
}

export function updateTodoCall(id, title, complete) {
  return axios.put('http://localhost:3000/todo/' + id, { title, complete }, config)
  .then(response => response.data)
  .catch(err => { throw err });
}