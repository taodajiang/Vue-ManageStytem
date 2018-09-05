import request from '@/utils/request'

export function login(username, pwd) {
    return request({
        url: 'api/Login',
        method: 'post',
        data: {
            userName: username,
            pwd: pwd
        }
    })
}

export function getInfo(username, pwd) {
    return request({
        url: 'api/userInfo',
        method: 'post',
        data: {
            userName: username,
            pwd: pwd
        }
    })
}

// export function logout() {
//     return request({
//         url: '/user/logout',
//         method: 'post'
//     })
// }