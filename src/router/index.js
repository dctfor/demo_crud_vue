import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Calendar from '@/components/Calendar'
import ContactManager from '@/views/ContactManager'
import ContactAdd from '@/views/ContactAdd'
import ContactEdit from '@/views/ContactEdit'
import ContactView from '@/views/ContactView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: to => {
        return { path: '/contact' }
      },
      component: Home
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/contact',
      name: 'ContactManager',
      component: ContactManager
    },
    {
      path: '/contact/add',
      name: 'ContactAdd',
      component: ContactAdd
    },
    {
      path: '/contact/edit/:contactId',
      name: 'ContactEdit',
      component: ContactEdit
    },
    {
      path: '/contact/view/:contactId',
      name: 'ContactView',
      component: ContactView
    }
  ],
  mode: 'history'
})
