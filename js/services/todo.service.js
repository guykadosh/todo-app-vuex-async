// import { storageService } from './storage.service.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const KEY = 'todosDB'

export const todoService = {
  query,
  getById,
  remove,
  save,
  getEmptyTodo,
}

_createTodos()

function query(filterBy = { txt: '', status: '' }) {
  const { txt, status } = filterBy
  return storageService.query(KEY).then(todos => {
    let filteredTodos = todos

    const regex = new RegExp(txt, 'i')

    filteredTodos = filteredTodos.filter(todo => regex.test(todo.txt))

    if (status) {
      filteredTodos = filteredTodos.filter(
        todo =>
          (todo.isDone && status === 'done') ||
          (!todo.isDone && status === 'active')
      )
    }
    return filteredTodos
  })
}

function getById(id) {
  return storageService.get(KEY, id)
}

function remove(id) {
  return storageService.remove(KEY, id)
}

function save(todo) {
  const savedTodo = todo._id
    ? storageService.put(KEY, todo)
    : storageService.post(KEY, todo)

  return savedTodo
}

function getEmptyTodo() {
  return {
    _id: '',
    txt: '',
    isDone: false,
  }
}

function _createTodos() {
  let todos = localStorage.getItem(KEY)

  if (!todos || !todos.length) {
    todos = [
      _createTodo('Recover from sprint 3'),
      _createTodo('Own Todos app once and for all'),
      _createTodo('Wait for a async version'),
    ]
    localStorage.setItem(KEY, JSON.stringify(todos))
  }
  return todos
}

function _createTodo(txt) {
  return {
    _id: utilService.makeId(),
    txt,
    isDone: false,
  }
}
