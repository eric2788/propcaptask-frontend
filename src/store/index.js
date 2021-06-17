import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const axios = Vue.axios

const wait = (seconds) => new Promise((res, ) => setTimeout(res, seconds * 1000))

const realActions = {
    // real
    async login({commit}, data){
      const res = await axios.post('/login', data)
      if (!res.error){
        commit('updateToken', res.token)
      }else{
        throw new Error(res.error)
      }
    },
    async register({commit}, data){
      const res = await axios.post('/register', data)
      if (!res.error){
        commit('updateToken', res.token)
      }else{
        throw new Error(res.error)
      }
    },
    async loadUsers({state}){
      const res = await axios.get('/users', {token: state.token})
      if (!res.error){
        return res
      }else{
        throw new Error(res.error)
      }
    },
    async updatePassword({state, commit}, data){
      const res = await axios.post('/password', {token: state.token, data})
      if (!res.error){
        if (res.token) commit('updateToken', res.token)
      }else{
        throw new Error(res.error)
      }
    },
    async logout({state, commit}){
      const res = await axios.post('/logout', {token: state.token})
      commit('updateToken', null)
      if (res.error){
        throw new Error(res.error)
      }
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
    }
  },
  getters: {
    isAuthenticated(state){
      return !!state.token
    }
  },
  actions: {
    ...fakeActions
  },
  modules: {
  }
})
