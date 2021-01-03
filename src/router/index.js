import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path:'*',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/front/Home.vue'),
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import('../views/front/Sales.vue'),
  },
  {
    path:'/login',
    name:'Login',
    component:() => import('../views/back/Login.vue'),
  },
  {
    path:'/detail/:cardId',
    name:'Detail',
    component:() => import('../views/front/Detail.vue'),
  },
  {
    path:'/cart',
    name:'Cart',
    component:() => import('../views/front/Cart.vue'),
  },
  {
    path:'/order',
    name:'Order',
    component:() => import('../views/front/Order.vue'),
  },
  {
    path:'/customer',
    name:'Customer',
    component:() => import('../views/front/Customer.vue'),
  },
  {
    path:'/check',
    name:'Check',
    component:() => import('../views/front/Check.vue'),
  },
  {
    path:'/admin',
    name:'Dashboard',
    component:() => import('../views/back/Dashboard.vue'),
    children:[
    {
      path:'/admin/products',
      name:'Products',
      component:() => import('../views/back/Products.vue'),
      meta:{requiresAuth:true},
    },
    {
      path:'/admin/coupons',
      name:'Coupons',
      component:() => import('../views/back/Coupons.vue'),
      meta:{requiresAuth:true},
    },
    {
      path:'/admin/form',
      name:'Form',
      component:() => import('../views/back/Form.vue'),
      meta:{requiresAuth:true},
    }
  ]
  }
]

const router = new VueRouter({
  routes
})

export default router
