import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import board from '../views/board.vue';
import dashBoard from '../views/user-dashboard.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/u',
        name: 'Dashboard',
        component: dashBoard
    },
    {
        path: '/board/:id',
        name: 'board',
        component: board
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router