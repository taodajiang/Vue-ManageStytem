import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//初始化路由
export const constantRouterMap = [{
        path: '/',
        redirect: '/login',
        hidden: true
    }, {
        path: '/login',
        name: 'Login',
        component: resolve => require(['../views/login/login.vue'], resolve),
        hidden: true
    },
    {
        path: '/home',
        name: 'Home',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/home/home',
        hidden: true,
        children: [{
            path: 'home',
            component: resolve => require(['../views/home/home.vue'], resolve)
        }, {
            path: 'changePWd',
            component: resolve => require(['../views/home/changePwd.vue'], resolve)
        }]
    },
    { //用户管理
        path: '/user',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/user/memberInfo',
        name: 'User',
        meta: {
            title: '用户管理',
            //roles: [1, 2, 3, 11, 12],
            icon: 'iconfont icon-huiyuan'
        },
        children: [{
                path: 'memberInfo',
                name: 'MemberInfo',
                component: resolve => require(['../views/user/memberInfo.vue'], resolve),
                meta: {
                    title: '用户管理',
                    // roles: [1],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'sellManage',
                name: 'SellManage',
                component: resolve => require(['../views/user/sellManage.vue'], resolve),
                meta: {
                    title: '销售管理',
                    // roles: [2],
                    icon: 'iconfont icon-dian'
                }
            }
        ]
    },
    //产品管理
    {
        path: '/product',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/product/onLine',
        name: 'Product',
        meta: {
            title: '产品管理',
            // roles: [5, 6],
            icon: 'iconfont icon-icon_chanpin'
        },
        children: [{
                path: 'onLine',
                name: 'OnLine',
                component: resolve => require(['../views/product/onLine.vue'], resolve),
                meta: {
                    title: '线上产品管理',
                    // roles: [5],
                    icon: 'iconfont icon-dian'
                },
            },
            {
                path: 'offLine',
                name: 'OffLine',
                component: resolve => require(['../views/product/offLine.vue'], resolve),
                meta: {
                    title: '线下产品管理',
                    // roles: [6],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'featureTag',
                name: 'FeatureTag',
                component: resolve => require(['../views/product/featureTag.vue'], resolve),
                meta: {
                    title: '特色标签配置',
                    // roles: [6],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'occupationList',
                name: 'OccupationList',
                component: resolve => require(['../views/product/occupationList.vue'], resolve),
                meta: {
                    title: '职位表管理',
                    // roles: [6],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'insuranceType',
                name: 'InsuranceType',
                component: resolve => require(['../views/product/insuranceType.vue'], resolve),
                meta: {
                    title: '保险类型管理',
                    // roles: [6],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'insuranceCompany',
                name: 'InsuranceCompany',
                component: resolve => require(['../views/product/insuranceCompany.vue'], resolve),
                meta: {
                    title: '保险公司管理',
                    // roles: [6],
                    icon: 'iconfont icon-dian'
                }
            },
        ]
    },
    //订单管理
    {
        path: '/order',
        name: 'Order',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/order/onLineOrder',
        meta: {
            title: '订单管理',
            // roles: [7],
            icon: 'iconfont icon-xinwen'
        },
        children: [{
                path: 'onLineOrder',
                name: 'OnLineOrder',
                component: resolve => require(['../views/order/onLineOrder.vue'], resolve),
                meta: {
                    title: '线上订单管理',
                    // roles: [7],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'offLineOrder',
                name: 'OffLineOrder',
                component: resolve => require(['../views/order/offLineOrder.vue'], resolve),
                meta: {
                    title: '线下订单管理',
                    // roles: [7],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'appointmentOrder',
                name: 'AppointmentOrder',
                component: resolve => require(['../views/order/appointmentOrder.vue'], resolve),
                meta: {
                    title: '预约订单管理',
                    // roles: [7],
                    icon: 'iconfont icon-dian'
                }
            }
        ]
    },
    //平台维护
    {
        path: '/platform',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/platform/topicManage',
        name: 'Platform',
        meta: {
            title: '平台维护',
            // roles: [8, 9, 10, 4],
            icon: 'iconfont icon-wangzhan'
        },
        children: [{
                path: 'topicManage',
                name: 'TopicManage',
                component: resolve => require(['../views/platform/topicManage.vue'], resolve),
                meta: {
                    title: '专题管理',
                    // roles: [10],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'productSell',
                name: 'ProductSell',
                component: resolve => require(['../views/platform/productSell.vue'], resolve),
                meta: {
                    title: '产品营销',
                    // roles: [9],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'adLink',
                name: 'AdLink',
                component: resolve => require(['../views/platform/adLink.vue'], resolve),
                meta: {
                    title: '广告链接',
                    // roles: [8],
                    icon: 'iconfont icon-dian'
                }
            }
        ]
    },
    //营销管理
    {
        path: '/marketing',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/marketing/activityManage',
        name: 'Marketing',
        meta: {
            title: '营销管理',
            // roles: [8, 9, 10, 4],
            icon: 'iconfont icon-icon_yingxiao'
        },
        children: [{
                path: 'activityManage',
                name: 'ActivityManage',
                component: resolve => require(['../views/marketing/activityManage.vue'], resolve),
                meta: {
                    title: '活动管理',
                    // roles: [8],
                    icon: 'iconfont icon-dian'
                }
            },

        ]
    },
    //系统设置
    {
        path: '/system',
        component: resolve => require(['../views/layout/Layout.vue'], resolve),
        redirect: '/system/department',
        name: 'System',
        meta: {
            title: '系统设置',
            // roles: [8, 9, 10, 4],
            icon: 'iconfont icon-xitong'
        },
        children: [{
                path: 'department',
                name: 'Department',
                component: resolve => require(['../views/system/department.vue'], resolve),
                meta: {
                    title: '机构管理',
                    // roles: [8],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'accountManage',
                name: 'AccountManage',
                component: resolve => require(['../views/system/accountManage.vue'], resolve),
                meta: {
                    title: '账号管理',
                    // roles: [8],
                    icon: 'iconfont icon-dian'
                }
            },
            {
                path: 'roleManage',
                name: 'RoleManage',
                component: resolve => require(['../views/system/roleManage.vue'], resolve),
                meta: {
                    title: '角色管理',
                    // roles: [8],
                    icon: 'iconfont icon-dian'
                }
            },

        ]
    }
]

export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})

//异步挂载路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
    //     {
    //     path: '/home',
    //     name: 'Home',
    //     component: resolve => require(['../views/layout/Layout.vue'], resolve),
    //     redirect: '/home/home',
    //     // hidden: true,
    //     children: [{
    //       path: 'home',
    //       component: resolve => require(['../views/home/home.vue'], resolve)
    //     }]
    //   },
    // { //用户管理
    //     path: '/user',
    //     component: resolve => require(['../views/layout/Layout.vue'], resolve),
    //     redirect: '/user/memberInfo',
    //     name: 'User',
    //     meta: {
    //         title: '用户管理',
    //         //roles: [1, 2, 3, 11, 12],
    //         //icon: 'iconfont icon-wangzhan'
    //     },
    //     children: [{
    //             path: 'memberInfo',
    //             name: 'MemberInfo',
    //             component: resolve => require(['../views/user/memberInfo.vue'], resolve),
    //             meta: {
    //                 title: '用户管理',
    //                 // roles: [1],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'sellManage',
    //             name: 'SellManage',
    //             component: resolve => require(['../views/user/sellManage.vue'], resolve),
    //             meta: {
    //                 title: '销售管理',
    //                 // roles: [2],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         }
    //     ]
    // },
    // //产品管理
    // {
    //     path: '/product',
    //     component: resolve => require(['../views/layout/Layout.vue'], resolve),
    //     redirect: '/product/onLine',
    //     name: 'Product',
    //     meta: {
    //         title: '产品管理',
    //         // roles: [5, 6],
    //         // icon: 'iconfont icon-xinwen'
    //     },
    //     children: [{
    //             path: 'onLine',
    //             name: 'OnLine',
    //             component: resolve => require(['../views/product/onLine.vue'], resolve),
    //             meta: {
    //                 title: '线上产品管理',
    //                 // roles: [5],
    //                 // icon: 'iconfont icon-dian'
    //             },
    //         },
    //         {
    //             path: 'offLine',
    //             name: 'OffLine',
    //             component: resolve => require(['../views/product/offLine.vue'], resolve),
    //             meta: {
    //                 title: '线下产品管理',
    //                 // roles: [6],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'featureTag',
    //             name: 'FeatureTag',
    //             component: resolve => require(['../views/product/featureTag.vue'], resolve),
    //             meta: {
    //                 title: '特色标签配置',
    //                 // roles: [6],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'occupationList',
    //             name: 'OccupationList',
    //             component: resolve => require(['../views/product/occupationList.vue'], resolve),
    //             meta: {
    //                 title: '职位表管理',
    //                 // roles: [6],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'insuranceType',
    //             name: 'InsuranceType',
    //             component: resolve => require(['../views/product/insuranceType.vue'], resolve),
    //             meta: {
    //                 title: '保险类型管理',
    //                 // roles: [6],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'insuranceCompany',
    //             name: 'InsuranceCompany',
    //             component: resolve => require(['../views/product/insuranceCompany.vue'], resolve),
    //             meta: {
    //                 title: '保险公司管理',
    //                 // roles: [6],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //     ]
    // },
    // //订单管理
    // {
    //     path: '/order',
    //     name: 'Order',
    //     component: resolve => require(['../views/layout/Layout.vue'], resolve),
    //     redirect: '/order/onLineOrder',
    //     meta: {
    //         title: '订单管理',
    //         // roles: [7],
    //         // icon: 'iconfont icon-huiyuan'
    //     },
    //     children: [{
    //             path: 'onLineOrder',
    //             name: 'OnLineOrder',
    //             component: resolve => require(['../views/order/onLineOrder.vue'], resolve),
    //             meta: {
    //                 title: '线上订单管理',
    //                 // roles: [7],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'offLineOrder',
    //             name: 'OffLineOrder',
    //             component: resolve => require(['../views/order/offLineOrder.vue'], resolve),
    //             meta: {
    //                 title: '线下订单管理',
    //                 // roles: [7],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'appointmentOrder',
    //             name: 'AppointmentOrder',
    //             component: resolve => require(['../views/order/appointmentOrder.vue'], resolve),
    //             meta: {
    //                 title: '预约订单管理',
    //                 // roles: [7],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         }
    //     ]
    // },
    // //平台维护
    // {
    //     path: '/platform',
    //     component: resolve => require(['../views/layout/Layout.vue'], resolve),
    //     redirect: '/platform/adLink',
    //     name: 'Platform',
    //     meta: {
    //         title: '平台维护',
    //         // roles: [8, 9, 10, 4],
    //         // icon: 'iconfont icon-xitong'
    //     },
    //     children: [{
    //             path: 'adLink',
    //             name: 'AdLink',
    //             component: resolve => require(['../views/platform/adLink.vue'], resolve),
    //             meta: {
    //                 title: '广告链接',
    //                 // roles: [8],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'productSell',
    //             name: 'ProductSell',
    //             component: resolve => require(['../views/platform/productSell.vue'], resolve),
    //             meta: {
    //                 title: '产品营销',
    //                 // roles: [9],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'topicManage',
    //             name: 'TopicManage',
    //             component: resolve => require(['../views/platform/topicManage.vue'], resolve),
    //             meta: {
    //                 title: '专题管理',
    //                 // roles: [10],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         }
    //     ]
    // },
    // //营销管理
    // {
    //     path: '/marketing',
    //     component: resolve => require(['../views/layout/Layout.vue'], resolve),
    //     redirect: '/marketing/activityManage',
    //     name: 'Marketing',
    //     meta: {
    //         title: '营销管理',
    //         // roles: [8, 9, 10, 4],
    //         // icon: 'iconfont icon-xitong'
    //     },
    //     children: [{
    //             path: 'activityManage',
    //             name: 'ActivityManage',
    //             component: resolve => require(['../views/marketing/activityManage.vue'], resolve),
    //             meta: {
    //                 title: '活动管理',
    //                 // roles: [8],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },

    //     ]
    // },
    // //系统设置
    // {
    //     path: '/system',
    //     component: resolve => require(['../views/layout/Layout.vue'], resolve),
    //     redirect: '/system/department',
    //     name: 'System',
    //     meta: {
    //         title: '系统设置',
    //         // roles: [8, 9, 10, 4],
    //         // icon: 'iconfont icon-xitong'
    //     },
    //     children: [{
    //             path: 'department',
    //             name: 'Department',
    //             component: resolve => require(['../views/system/department.vue'], resolve),
    //             meta: {
    //                 title: '部门管理',
    //                 // roles: [8],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'accountManage',
    //             name: 'AccountManage',
    //             component: resolve => require(['../views/system/accountManage.vue'], resolve),
    //             meta: {
    //                 title: '账号管理',
    //                 // roles: [8],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },
    //         {
    //             path: 'roleManage',
    //             name: 'RoleManage',
    //             component: resolve => require(['../views/system/roleManage.vue'], resolve),
    //             meta: {
    //                 title: '角色管理',
    //                 // roles: [8],
    //                 // icon: 'iconfont icon-dian'
    //             }
    //         },

    //     ]
    // }
    //   {
    //     path: '*',
    //     redirect: '/404',
    //     component: resolve => require(['../views/404.vue'], resolve),
    //     hidden: true
    //   }

]