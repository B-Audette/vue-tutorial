import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import { users } from '../assets/users'
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile'
import Admin from '../views/Admin'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router guards

router.beforeEach(async (to, from, next) => {
  const user = store.state.User.user

  if (!user) {
    // dispatach is the function you call to run actions
    // store.commit to run a mutation in this context (like its in the action in strore/index.js)
    await store.dispatch('User/setUser', users[0])
  }

  const isAdmin = false
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  // if this requires an admin and if you are not, it will send you home
  if (requiresAdmin && !isAdmin) next({ name: 'Home' })
  else next()
})

export default router
