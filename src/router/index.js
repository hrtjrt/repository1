import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePage from '@/pages/HomePage.vue'
import UserRegisterPage from '@/pages/user/userRegisterPage.vue'
import AdminUserManagePage from '@/pages/admin/adminUserManagePage.vue'
import { userLogin } from '@/api/user.ts'
import UserLoginPage from '@/pages/user/userLoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path:'/user/login',
    name:'userLogin',
    component: UserLoginPage,
  },
   {
    path:'/user/register',
    name:'userRegister',
    component: UserRegisterPage,
  },
  {
    path: '/admin/userManage',
    name: 'adminUserManage',
    component: AdminUserManagePage,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
