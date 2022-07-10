export default {
  props: ['todo'],
  template: `
      <section class="todo-preview flex space-between">
          <p @click="$emit('toggled')"
              :class="done">{{ todo.txt }}</p>
          <div class="tools flex">
            <button @click="$emit('removed')" class="btn">
              <span>x</span>
            </button>
            <router-link 
              :to="'/todo/edit/' + todo._id"
              class="btn">
              <span>Edit</span>
            </router-link>
            <router-link 
              :to="'/todo/details/' + todo._id"
              class="btn">
              <span>Details</span>
            </router-link>
          </div>
      </section>
    `,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    done() {
      return { done: this.todo.isDone }
    },
  },
  unmounted() {},
}
