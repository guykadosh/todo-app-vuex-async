import filterBtn from './filter-btn.cmp.js'
export default {
  template: `
    <section class="todo-filter flex space-between">
        <input class="input" 
                v-model="txtInput"
                @input="setFilter('')" 
                type="text"
                placeholder="filter..">
        <div class="filter-btns flex align-center">
          <filter-btn 
          v-for="button in buttons" :button="button"
          :key="button.id"
          @filtered="setFilter" />
        </div>
    </section>
`,
  components: {
    filterBtn,
  },
  data() {
    return {
      filterBy: {
        txt: '',
        status: '',
      },
      txtInput: '',
      buttons: [
        {
          id: 'b1',
          type: '',
          isActive: true,
          title: 'All',
        },
        {
          id: 'b2',
          type: 'active',
          isActive: false,
          title: 'Active',
        },
        {
          id: 'b3',
          type: 'done',
          isActive: false,
          title: 'Done',
        },
      ],
    }
  },
  created() {},
  methods: {
    setFilter(button) {
      if (button) {
        this.filterBy.status = button.type
        this.buttons.forEach(btn => {
          btn.isActive = button.id === btn.id
        })
      }

      this.filterBy.txt = this.txtInput
      this.$emit('filtered', this.filterBy)
    },
  },
  computed: {},
  unmounted() {},
}
