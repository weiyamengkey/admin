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


 // 删除单个用户

export function deleteUser(userid) {
    console.log('要删除的用户id:',userid);
    return request({
        url: `users/${userid}`,
        method: 'delete'
    })
}

/**
 * 获取用户角色名的思路：
 * 1.通过用户id查询到角色id
 * 2.再通过角色id查询到角色名
 */

 /**
  * 通过用户id查询到角色id
  * @param {number} userid 
  */
 export function getUserInfo(userid) {
    return request({
        url: `users/${userid}`,
        method: 'get'
    })
}


 /**
  * 通过角色id查询到角色名
  * @param {number} roleId 
  */
 export function getUserRoleInfo(roleId) {
    return request({
        url: `roles/${roleId}`,
        method: 'get'
    })
}


/**
 * 分配用户角色   用户名（张三）--用户角色（董事长，总经理）--用户权限（ 财务，添加用户，管理订单）
 * users/:id/role
 */
export function setUserRole(userId,data) {
    return request({
        url: `users/${userId}/role`,
        method: 'put',
        data
    })
}

/**
 * 获取角色列表
 */
export function getRoleList() {
    return request({
        url: `roles`,
        method: 'get'
    })
}

/**
 * 获取用户权限列表
 */
export function getRightList(userid) {
    return request({
        url: `rights/list`,
        method: 'get'
    })
}