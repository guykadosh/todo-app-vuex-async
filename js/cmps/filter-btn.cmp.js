export default {
  props: ['button'],
  template: `
    <section class="filter-btn flex align-center justify-center" :class="active" @click="setFilter">
      <a>{{ button.title }}</a>
    </section>
`,
  data() {
    return {}
  },
  created() {},
  methods: {
    setFilter() {
      this.$emit('filtered', this.button)
    },
  },
  computed: {
    active() {
      return { active: this.button.isActive }
    },
  },
  unmounted() {},
}
