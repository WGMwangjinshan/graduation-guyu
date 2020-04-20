import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account:'',
    oldPassword:'',
    user_id:'',
    image_id:'',
    stageIndex_activeName:'first',
    stageKey:0,
    flowKey:0,
    options1:[],
    options2:[]
  },
  mutations: {
    stageKeyAdd(state)
    {
      state.stageKey++
    },
    flowKeyAdd(state)
    {
      state.flowKey++
    },
    changeStageIndex_activeName(state,activeName)
    {
        state.stageIndex_activeName = activeName
    },
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
        },
        makeImageId(state,image_id)
        {
          state.image_id = image_id
        },
        addOptions1(state,options1)
        {
          state.options1 = options1
        },
        addOptions2(state,options2)
        {
          state.options2 = options2
        },
  },
  actions: {
  },
  modules: {
  }
})
