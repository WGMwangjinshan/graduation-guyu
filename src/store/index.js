import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account:'',
    oldPassword:'',
    user_id:''
  },
  mutations: {
        changeAccount(state,newAccount)
        {
            state.account = newAccount
        },
        changePassword(state,oldPassword)
        {
            state.oldPassword = oldPassword
        },
        makeUserId(state,infoId)
        {
          state.user_id = infoId
        }

  },
  actions: {
  },
  modules: {
  }
})
