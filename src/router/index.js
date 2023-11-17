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
    {
        path: '/showname',
        name:'ShowName',
        component: (()=>import('../pages/ShowName.vue')),
        meta:{
            title:"姓名抽签"
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
