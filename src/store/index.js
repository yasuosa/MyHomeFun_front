import Vue from 'vue'
import Vuex from 'vuex'
import { resetRouter } from '@/router'
import persistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import { getToken, setToken,removeToken } from '@/utils/auth'
import userApi from '@/api/user'
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    user: {}, // 登录中的用户
    token: getToken(),
    categoryList:[],  // 可用的专栏,
    name: '',
    avatar: ''
  },
  mutations: {
    RESET_STATE: (state) => {
      state.name="",
      state.avatar="",
      state.user={}
    },
    SET_USER: (state, user) => {
      state.user = user
      // console.log('AAA' + user)
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_CATEGORYLIST:(state,categoryList) =>{
      state.categoryList=categoryList
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    }
  },
  getters: {
    getUser() {
      return store.state.user
    },
    getToken() {
      return store.state.token
    },
    getCategoryList(){
      return store.state.categoryList
    },
    getName(){
      return store.state.name
    },
    getAvatar(){
      return store.state.avatar
    },
  },
  actions: {
      // get user info
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userApi.getUserInfo().then(response => {
          const { data } = response
          console.log(data.user)

          if (!data) {
            reject('Verification failed, please Login again.')
          }
          commit('SET_NAME', data.user.nickname)
          commit('SET_AVATAR', data.user.headerUrl)
          commit('SET_USER', data.user)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

      // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      userApi.logout().then((res) => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve(res)
      }).catch(error => {
        removeToken()
        reject(error)
      })
    })
  }
  },
  modules: {
  },
  plugins: [
    persistedState({
      storage: {
        getItem: key => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value, { expires: 7 }),
        removeItem: key => Cookies.remove(key)
      }
    })
  ]
})

export default store
