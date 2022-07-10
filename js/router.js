import todoEdit from './cmps/todo-edit.cmp.js'
import todoApp from './pages/todo-app.js'
import todoDetials from './cmps/todo-detials.cmp.js'
import userProfile from './pages/user-profile.cmp.js'

const routes = [
  {
    path: '/',
    redirect: '/todo',
  },
  {
    path: '/todo/details',
    redirect: '/todo',
  },
  {
    path: '/todo',
    component: todoApp,
    children: [
      {
        path: 'edit/:todoId?',
        component: todoEdit,
      },
      {
        path: 'details/:todoId',
        component: todoDetials,
      },
    ],
  },
  {
    path: '/user',
    component: userProfile,
  },
]

export const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
})
