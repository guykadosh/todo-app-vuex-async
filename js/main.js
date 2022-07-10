import { router } from './router.js'
import { store } from './store/store.js'

import appHeader from './cmps/app-header.js'
import appFooter from './cmps/app-footer.js'
import userMsg from './cmps/user-msg.js'

const options = {
  template: `
        <section class="main" :style="appStyles">
            <app-header/>
            <user-msg/>
            <router-view/>
            <app-footer/>
        </section>
    `,
  created() {
    this.$store.dispatch({ type: 'loadTodos' })
  },
  components: {
    appHeader,
    appFooter,
    userMsg,
  },
  computed: {
    appStyles() {
      return {
        backgroundColor: this.prefs.bgColor,
        color: this.prefs.color,
      }
    },
    prefs() {
      return this.$store.getters.user.prefs
    },
  },
}

const app = Vue.createApp(options)
app.use(router)
app.use(store)
app.mount('#app')
