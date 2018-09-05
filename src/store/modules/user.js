import {
    login,
    getInfo
} from '@/api/login'
import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'
import {
    Message
} from 'element-ui'

const user = {
    state: {
        token: getToken(),
        name: '',
        roles: [],
        account: '',
        pwd: '',
        func: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_ACCOUNT: (state, account) => {
            state.account = account
        },
        SET_PWD: (state, pwd) => {
            state.pwd = pwd
        },
        SET_FUNC: (state, func) => {
            state.func = func
        }
    },

    actions: {
        // 登录
        Login({
            commit
        }, userInfo) {
            const account = userInfo.account;
            return new Promise((resolve, reject) => {
                login(userInfo.account, userInfo.password).then(response => {
                    if (response.data.Code == 1) {
                        const data = response.data.Data;
                        setToken(data.Token)
                        commit('SET_TOKEN', data.Token)
                        commit('SET_NAME', data.UserName)
                        localStorage.setItem("username", data.UserName);
                        commit('SET_ACCOUNT', account)
                        commit('SET_PWD', userInfo.password);
                    } else if (response.data.Code == 2) {
                        Message.error(response.data.Message)
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        //获取用户信息
        GetInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                const Account = JSON.parse(sessionStorage.getItem("userinfo")).account;
                const Pwd = JSON.parse(sessionStorage.getItem("userinfo")).password;
                getInfo(Account, Pwd).then(response => {
                    const data = response.data.Data;
                    const rolesList = data.Roles;
                    const funcList = []; //功能权限点
                    const CategoryIDList = [];
                    for (var key in rolesList) {
                        CategoryIDList.push(rolesList[key].CategoryID);
                        funcList.push(rolesList[key].ID)
                    }
                    const Roles = Array.from(new Set(CategoryIDList)); //获取页面权限点
                    commit('SET_ROLES', Roles)
                    commit('SET_FUNC', funcList)
                    commit('SET_NAME', data.UserName)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        // LogOut({
        //     commit,
        //     state
        // }) {
        //     return new Promise((resolve, reject) => {
        //         logout(state.token).then(() => {
        //             commit('SET_TOKEN', '')
        //             commit('SET_ROLES', [])
        //             removeToken()
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // 前端 登出
        FedLogOut({
            commit
        }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        },

        //动态修改权限
        // ChangeRole({
        //     commit
        // }, role) {
        //     return new Promise(resolve => {
        //         commit('SET_ROLES', [role]);
        //         commit('SET_TOKEN', role);
        //         setToken(role);
        //         resolve();
        //     })
        // }
    }
}

export default user