import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}, // default empty object
    myData: {},
  },
  mutations: {
    CHANGE_USER_INFO: (state, data) =>{
      state.userInfo = data
    },
    CHANGE_Data_INFO: (state, data) =>{
      state.myData = data
    },
  },
  actions: {
   
  },
  //save to web storage
  plugins : [createPersistedState()]
})