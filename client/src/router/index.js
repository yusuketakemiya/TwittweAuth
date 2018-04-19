import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/components/Start'
import Auth from '@/components/Auth'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Start',
      name: 'Start',
      component: Start
    },
    {
      path: '/Auth',
      name: 'Auth',
      component: Auth
    }
  ]
})
