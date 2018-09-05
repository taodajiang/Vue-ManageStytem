import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
    Message
} from 'element-ui'
import {
    getToken
} from '@/utils/auth' //验权

const whiteList = ['/login'] //不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (getToken()) { //判断是否有token
        if (to.path === '/login') {
            next();
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => {
                    // 拉取用户信息
                    const roles = store.getters.roles // note: roles must be a array! such as: ['editor','develop']
                    if (roles != '') {
                        store.dispatch('GenerateRoutes', {
                                roles
                            }).then(() => { // 根据roles权限生成可访问的路由表
                                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                                next({...to,
                                        replace: true
                                    }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                            })
                            .catch(() => {
                                store.dispatch('FedLogOut').then(() => {
                                    Message.error('验证失败,请重新登录')
                                    next({
                                        path: '/login'
                                    })
                                })
                            })
                    } else {
                        Message.error('该用户没有权限');
                        NProgress.done();
                        return;
                    }
                })
            } else {
                next()
                    //当有用户权限的时候，说明所有可访问路由已生成
                    //如访问没权限的全部会自动进入404页面
                    // if (hasPermission(store.getters.roles, to.meta.role)) {
                    //     next();
                    // } else {
                    //     next({ path: '/404' })
                    // }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done() //结束Progress
})