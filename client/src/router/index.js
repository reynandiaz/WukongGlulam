import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/NF019-00Entry',
    name: 'NF019-00Entry',
    component: () => import('../views/NF019-00Entry.vue')
  },
  {
    path: '/NF019-00Summary',
    name: 'NF019-00Summary',
    component: () => import('../views/NF019-00Summary.vue')
  },
  {
    path: '/BatchEntry',
    name: 'BatchEntry',
    component: () => import('../views/BatchEntry.vue')
  },
  {
    path: '/ToleranceEntry',
    name: 'ToleranceEntry',
    component: () => import('../views/ToleranceEntry.vue')
  },
  {
    path: '/MachineBreakdownEntry',
    name: 'MachineBreakdownEntry',
    component: () => import('../views/MachineBreakdownEntry.vue')
  },
  {
    path: '/UserAccounts',
    name: 'UserAccounts',
    component: () => import('../views/UserAccounts.vue')
  },
  {
    path: '/Machines',
    name: 'Machines',
    component: () => import('../views/Machines.vue')
  },
  {
    path: '/Sawmills',
    name: 'Sawmills',
    component: () => import('../views/Sawmills.vue')
  },
  {
    path: '/ShiftSchedules',
    name: 'ShiftSchedules',
    component: () => import('../views/ShiftSchedules.vue')
  },
  {
    path: '/Suppliers',
    name: 'Suppliers',
    component: () => import('../views/Suppliers.vue')
  },
  {
    path: '/Species',
    name: 'Species',
    component: () => import('../views/Species.vue')
  },
  {
    path: '/BreakdownTypes',
    name: 'BreakdownTypes',
    component: () => import('../views/BreakdownTypes.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/') {
    if (store.state.userInfo.EmployeeCode != undefined) {
      next()
    } else {
      next({name: 'Login'})
    }
  }else if(store.state.userInfo.EmployeeCode != undefined){
    // console.log('asdasd')
      next({ name: 'NF019-00Entry' })
  }else {
    // console.log('h`ere')
      next()
  }
})
 
export default router
