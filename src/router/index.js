import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        name:'Home',
        component: (()=>import('../pages/Home.vue')),
        meta:{
            title:"主页"
        }
    },
    {
        path: '/mbti',
        name:'MBTI',
        component: (()=>import('../pages/MBTI.vue')),
        meta:{
            title:"MBTI Start !"
        }
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.afterEach((to, from) => {
    document.title =to.meta.title
})

export default router
