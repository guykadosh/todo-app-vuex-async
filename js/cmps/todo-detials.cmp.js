export default {
  template: `
    <section class="todo-details flex flex-column align-center justify-center">
        <p>{{todo.txt}}</p>
        <p>{{ status }}</p>
    </section>
`,
  watch: {
    '$route.params': {
      handler: function () {
        const { todoId } = this.$route.params
        this.$store.commit({ type: 'setCurrTodo', todoId })
        this.todo = this.$store.state.currTodo
      },
      immediate: true,
    },
  },
  data() {
    return {
      todo: null,
    }
  },
  created() {},
  methods: {},
  computed: {
    status() {
      return this.todo.isDone ? 'Compeleted Task' : 'Pending Task'
    },
  },
  unmounted() {},
}
