import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account:'',
    oldPassword:''
  },
  mutations: {
        changeAccount(state,newAccount)
        {
            state.account = newAccount
        },
        changePassword(state,oldPassword)
        {
            state.oldPassword = oldPassword
        }

  },
  actions: {
  },
  modules: {
  }
})
