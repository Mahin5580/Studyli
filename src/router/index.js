import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import Courses from '@/views/Courses.vue'
import Course from '@/views/Course.vue'
import MyAccount from '@/views/dashboard/MyAccount.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView  
  },
   {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp  
  },
   {
    path: '/log-in',
    name: 'LogIn',
    component: LogIn  
  },
   {
    path: '/courses',
    name: 'Courses',
    component: Courses  
  },
   {
    path: '/courses/:slug',
    name: 'Course',
    component: Course  
  },
   {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccount  
  },

 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
