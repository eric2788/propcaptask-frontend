import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const loadVue = (vue) => () => import(`../views/${vue}.vue`)

const routes = [
  {
    path: '/',
    component: loadVue('Home'),
    children: [
      {
        path: '',
        name: 'Home',
        components: {
          home: loadVue('home/UserList')
        }
      },
      {
        path: 'changepassword',
        name: 'ChangePW',
        components: {
          home: loadVue('home/ChangePassword')
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: loadVue('Login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/*
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.isAuthenticated) next({ name: 'Login' })
  else next()
})
*/

export default router
