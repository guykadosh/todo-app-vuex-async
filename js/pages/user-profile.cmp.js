export default {
  template: `
    <section class="user-profile flex flex-column">
      <form @submit.prevent="applyChanges" class="flex space-between">
        <div>
          <label for="fullname">Full name</label>
          <input 
          id="fullname"
          class="input" 
          type="text"
          v-model="user.fullname">
        </div>
        <div>
          <input id="text-color" v-model="user.prefs.color" type="color">
          <label for="text-color">Text</label>
        </div>
        <div>
          <input id="bgc-color" v-model="user.prefs.bgColor" type="color">
          <label for="bgc-color">Background</label>
        </div>
        <button class="btn">Apply</button>
      </form>
      <h3>Activity log</h3>
      <ul class="activities clean-list">
          <li class="flex space-between" v-for="activity in user.activities">
             <p>{{ activity.txt }}</p>
             <p>{{ timeSince(activity.at) }} ago</p>
          </li>
      </ul>
      <router-link class="btn" to="/todo">Back</router-link>
    </section>
`,
  data() {
    return {
      user: null,
    }
  },
  created() {
    this.user = this.clone
  },
  methods: {
    applyChanges() {
      const user = JSON.parse(JSON.stringify(this.user))
      this.$store.commit({ type: 'updateUser', user })
    },
    timeSince(timestamp) {
      const date = new Date(timestamp)

      let seconds = Math.floor((new Date() - date) / 1000)

      let interval = seconds / 31536000

      if (interval > 1) {
        return Math.floor(interval) + ' years'
      }
      interval = seconds / 2592000
      if (interval > 1) {
        return Math.floor(interval) + ' months'
      }
      interval = seconds / 86400
      if (interval > 1) {
        return Math.floor(interval) + ' days'
      }
      interval = seconds / 3600
      if (interval > 1) {
        return Math.floor(interval) + ' hours'
      }
      interval = seconds / 60
      if (interval > 1) {
        return Math.floor(interval) + ' minutes'
      }
      return Math.floor(seconds) + ' seconds'
    },
  },
  computed: {
    clone() {
      return JSON.parse(JSON.stringify(this.$store.getters.user))
    },
  },
  unmounted() {},
}
