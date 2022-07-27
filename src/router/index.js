import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
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
        return { path: '/contacts' }
      },
      component: Home
    },
    {
      path: '/contacts',
      name: 'ContactManager',
      component: ContactManager
    },
    {
      path: '/contacts/add',
      name: 'ContactAdd',
      component: ContactAdd
    },
    {
      path: '/contacts/edit/:contactId',
      name: 'ContactEdit',
      component: ContactEdit
    },
    {
      path: '/contacts/view/:contactId',
      name: 'ContactView',
      component: ContactView
    }
  ],
  mode: 'history'
})
