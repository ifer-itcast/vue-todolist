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
    },
    // 删除
    removeItem(state, id) {
      const idx = state.list.findIndex(item => item.id === id)
      if (idx !== -1) state.list.splice(idx, 1)
    },
    // 改
    changeStatus(state, param) {
      const idx = state.list.findIndex(item => item.id === param.id)
      if (idx !== -1) state.list[idx].done = param.done
    },
    // 清除已完成，即保留未完成
    cleanDone(state) {
      state.list = state.list.filter(x => !x.done)
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(x => !x.done).length
    }
  }
})
