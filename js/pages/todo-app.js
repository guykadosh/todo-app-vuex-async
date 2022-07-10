import todoList from '../cmps/todo-list.cmp.js'
import todoFilter from '../cmps/todo-filter.cmp.js'
import loader from '../cmps/loader.cmp.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export default {
  template: `
      <section class="todo-app">
          <todo-filter @filtered="debounceHandler" />
          <todo-list v-if="todos && !isLoading"
                     :todos="todos"
                     @removed="removeTodo"
                     @toggled="toggleTodo" />
          <loader v-else />
          <router-view />
      </section>
  `,
  components: {
    todoList,
    todoFilter,
    loader,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  created() {
    this.debounceHandler = _.debounce(this.setFilterBy, 500)
  },
  methods: {
    removeTodo(todoId) {
      this.$store
        .dispatch({ type: 'removeTodo', todoId })
        .then(() => {
          showSuccessMsg('Todo removed')
        })
        .catch(err => {
          showErrorMsg('Cannot remove todo')
        })
    },
    setFilterBy(filterBy) {
      this.isLoading = true
      filterBy = JSON.parse(JSON.stringify(filterBy))
      this.$store
        .dispatch({ type: 'filterTodos', filterBy })
        .then(() => (this.isLoading = false))
    },
    toggleTodo(todo) {
      const newTodo = JSON.parse(JSON.stringify(todo))
      newTodo.isDone = !newTodo.isDone
      this.$store
        .dispatch({ type: 'saveTodo', todo: newTodo })
        .then(() => {
          showSuccessMsg('Todo updated')
        })
        .catch(err => {
          showErrorMsg('Cannot update todo')
        })
    },
  },
  computed: {
    todos() {
      return this.$store.getters.todosToDisplay
    },
  },
  unmounted() {},
}
