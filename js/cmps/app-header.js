export default {
  template: `
      <header class="flex space-between">
        <h2>Todos</h2>
        <div class=""> 
          <p>Hello, {{ fullName }}</p>
          <router-link class="btn" to="/user">Profile</router-link>
          <div class="progress-bar">
            <span :style="{ width: donePct + '%' }">{{donePct}}%</span>
          </div>
        </div> 
      </header>
      `,
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    fullName() {
      return this.$store.getters.user.fullname
    },
    donePct() {
      return this.$store.getters.donePct
    },
  },
  unmounted() {},
}
