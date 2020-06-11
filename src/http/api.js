//引入request.js
import request from './request'

// 登录接口
export function login(data) {
    return request({
        url: 'login',
        method: 'post',
        data
    })
}

// 用户列表接口
export function user(params) {
    return request({
        url: 'users',
        method: 'get',
        params
    })
}

// 修改用户状态接口
export function modify(user) {
    return request({
        url: `users/${user.id}/state/${user.mg_state}`,
        method: 'put'
    })
}

//编辑用户信息
export function edit(userid, data) {
    return request({
        url: `users/${userid}`,
        method: 'put',
        data
    })
}

// 添加用户
export function add(data) {
    return request({
        url: 'users',
        method: 'post',
        data
    })
}
