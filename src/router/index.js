import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ContactManager from '@/views/ContactManager'
import ContactAdd from '@/views/ContactAdd'
import ContactEdit from '@/views/ContactEdit'
import ContactView from '@/views/ContactView'
import LoginForm from '@/views/LoginForm'
import Error404 from '@/views/errors/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: to => {
        return { path: '/login' }
      },
      component: Home
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm
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
    },
    { path: '*', component: Error404 }
  ],
  mode: 'history'
})
