import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '../views/Homepage.vue'
import Myprofile from '../views/Myprofile.vue'
import Createpost from '../views/Createpost.vue'
import Loginpage from '../views/Loginpage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import Users from '@/views/Users.vue'
import Onepost from '@/views/Onepost.vue'
import Onemypost from '@/views/Onemypost.vue'
import Oneuser from '@/views/Oneuser.vue'
import Updatepost from '@/views/Updatepost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: Homepage
    },
    {
      path: '/profile',
      name: 'profile',
      component: Myprofile
    },
    {
      path: '/profile/create',
      name: 'create',
      component: Createpost
    },
    {
      path: '/login',
      name: 'loginpage',
      component: Loginpage
    },
    {
      path: '/login/signup',
      name: 'signup',
      component: SignUpPage
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/:id',
      name: 'Onepost',
      component: Onepost
    },
    {
      path: '/profile/:id',
      name: 'Onemypost',
      component: Onemypost
    },
    {
      path: '/users/:id',
      name: 'Oneuser',
      component: Oneuser
    },
    {
      path: '/update/:id',
      name: 'Updatepost',
      component: Updatepost
    },

  ]
})

export default router
