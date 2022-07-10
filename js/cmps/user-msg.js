import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
    <div v-if="alive" class="user-msg" :class="alertClass" >
        {{msg.txt}}
    </div>
    `,
  created() {
    eventBus.on('show-msg', msg => {
      this.msg = msg
      var delay = msg.delay || 2000
      this.alive = true
      setTimeout(() => {
        this.alive = false
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return
      return this.msg.type
    },
  },
}
