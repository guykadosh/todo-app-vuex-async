import { todoService } from '../services/todo.service.js'

export const todoStore = {
  state: {
    todos: null,
    filteredTodos: null,
    filterBy: {
      txt: '',
      status: '',
    },
    currTodo: null,
    updatedTodo: null,
    removeTodo: null,
  },
  getters: {
    todo({ currTodo }) {
      return currTodo
    },
    donePct({ todos }) {
      if (!todos) return
      const dones = todos.reduce(
        (acc, todo) => (todo.isDone ? acc + 1 : acc),
        0
      )
      const total = todos.length

      return ((dones / total) * 100).toFixed(2)
    },
    todosToDisplay({ filteredTodos, todos }) {
      return filteredTodos ? filteredTodos : todos
    },
  },
  mutations: {
    setTodos(state, { todos }) {
      state.todos = todos
    },
    setFilteredTodos(state, { todos }) {
      state.filteredTodos = todos
    },
    setCurrTodo(state, { todo }) {
      state.currTodo = todo
    },
    addTodo(state, { todo }) {
      state.todos.push(todo)
    },
    updateTodo(state, { todo }) {
      const idx = state.todos.findIndex(p => p._id === todo._id)
      state.todos.splice(idx, 1, todo)
    },
    removeTodo(state, { todoId }) {
      const idx = state.todos.findIndex(todo => todo._id === todoId)
      state.todos.splice(idx, 1)
    },
    filterBy(state, { filterBy: { txt, status } }) {
      state.filterBy.txt = txt
      state.filterBy.status = status
    },
    clearUpdatedTodo(state) {
      state.updatedTodo = null
    },
  },
  actions: {
    loadTodos({ commit }) {
      todoService
        .query()
        .then(todos => commit({ type: 'setTodos', todos }))
        .catch(err => {
          throw err
        })
    },
    filterTodos({ commit }, { filterBy }) {
      todoService
        .query(filterBy)
        .then(todos => commit({ type: 'setFilteredTodos', todos }))
        .catch(err => {
          throw err
        })
    },
    setCurrTodo({ commit }, { todoId }) {
      return todoService
        .getById(todoId)
        .then(todo => commit({ type: 'setCurrTodo', todo }))
    },
    saveTodo({ commit, dispatch }, { todo }) {
      const actionType = todo._id ? 'updateTodo' : 'addTodo'
      return todoService.save(todo).then(savedTodo => {
        commit({ type: actionType, todo: savedTodo })
        const txt = actionType === 'addTodo' ? 'Added a todo' : 'Updated todo'
        const activty = { txt, at: Date.now() }
        dispatch({ type: 'addActivity', activty }, { root: true })
        return savedTodo
      })
    },
    removeTodo({ commit, dispatch }, payload) {
      return todoService.remove(payload.todoId).then(() => {
        commit(payload)
        const activty = { txt: 'Removed a todo', at: Date.now() }
        dispatch({ type: 'addActivity', activty }, { root: true })
      })
    },
  },
}
