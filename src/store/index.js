import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const axios = Vue.axios

const wait = (seconds) => new Promise((res, ) => setTimeout(res, seconds * 1000))

const realActions = {
    // real
    async postLogin({commit}, data){
      const res = await axios.post('/login', data)
      commit('updateToken', res.data.token)
    },
    async postRegister({commit}, data){
      const res = await axios.post('/register', data)
      commit('updateToken', res.data.token)
    },
    async getUsers(context, {page = 1, sortBy = "username", descending = false} = {}){
      const res = await axios.get(`/users?page=${page}&sortBy=${sortBy}&descending=${descending}`)
      return res.data
    },
    async postUpdatePassword({ commit}, data){
      const res = await axios.post('/password', data)
      if (res.data.token) commit('updateToken', res.data.token)
    },
    async postLogout({commit}){
      await axios.post('/logout')
      commit('updateToken', null)
    }
}


const fakeActions = {
  // fake
  async fakeLogin({commit}, {username, password}){
    console.log(`axios: ${axios}`)
    console.log(`logging in with ${username?.includes('@') ? 'email' : 'username'} ${username} and password ${password}`)
    await wait(3)
    if (username?.includes('@') ? username === 'username@mail.com' : username === 'username' && password === 'password'){
      commit('updateToken', 'test@token#123456789')
    }else{
      throw new Error('Invalid Credentials.')
    }
  },
  async fakeRegister({commit}, {email, username, password}){
    console.log(`register with email ${email}, username ${username} and password ${password}`)
    await wait(3)
    commit('updateToken', 'test@token#123456789')
  },
  async fakeLoadUsers(){
    await wait(5)
    return [
      {
        username: 'usera',
        email: 'usera@example.com',
        registered: new Date().toISOString()
      },
      {
        username: 'userb',
        email: 'userb@example.com',
        registered: new Date().toISOString()
      },
      {
        username: 'userc',
        email: 'userc@example.com',
        registered: new Date().toISOString()
      }
    ]
  },
  async fakeUpdatePassword({commit}, {pw, new_pw}){
    console.log(`updating password from ${pw} to ${new_pw}`)
    await wait(5)
    commit('updateToken', 'test@token#123456789')
  },
  async fakeLogout({commit}){
    await wait(3)
    commit('updateToken', null)
  }
}


export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    updateToken(state, token){
      state.token = token
      axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
    }
  },
  getters: {
    isAuthenticated(state){
      return !!state.token
    }
  },
  actions: {
    ...realActions
  },
  modules: {
  }
})
