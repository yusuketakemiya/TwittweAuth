import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Auth from '@/components/Auth'
import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    }
  ]
})
