import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'x',
    nextId: 5
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    // 添加
    addItem(state) {
      const obj = {
        id: state.nextId++,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.inputValue = ''
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  modules: {}
})
