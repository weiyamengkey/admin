//引入request.js
import request from './request'

//针对不同的业务接口封装 例如：登录，用户列表，权限列表，商品列表。。。。
//接口重构处理
/**
 * 登录接口
 * @params {Objet} data {username:'用户名',password:密码}
 */


export function login(data) {
    return request({
        url: 'login',
        method: 'post',
        data
    })
}

/**
 * 用户列表接口
 */

export function getUser(params) {
    return request({
        url: 'users',
        method: 'get',
        params
    })
}

/**
 * 修改用户状态接口
 */

export function modifyUserStaus(user) {
    return request({
        url: `users/${user.id}/state/${user.mg_state}`,
        method: 'put'
    })
}

/**
 * 编辑用户信息
 */
export function editUserInfo(userid, data) {
    return request({
        url: `users/${userid}`,
        method: 'put',
        data
    })
}

/**
 * 删除单个用户
 */
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

/**
 * 获取用户权限列表
 */
export function getRightTree(userid) {
    return request({
        url: `rights/tree`,
        method: 'get'
    })
}


/**
 * 分配权限给某个角色
 * @params { number } roleId 角色id
 * @params {string} data 是全部或部分选中的id  '1,2,2,3,5,6,7,7,8'
 */
export function setRightsToRole(roleId, data) {
    return request({
        url: `roles/${roleId}/rights`,
        method: 'post',
        data
    })
}

/**
 * 商品列表接口
 */
export function goodsList(params) {
    return request({
        url: `goods`,
        method: 'get',
        params
    })
}

/**
 * 获取商品分类接口
 */
export function getGoodsCate(type=3) {
    return request({
        url: `categories`,
        method: 'get',
        params: {type}, //默认指定三级分类，通过type可更改1,2,3
    })
}

/**
 * 针对商品指定的第三级分类id，来确定该商品的参数（动态参数，静态参数）
 * 动态参数：一次可以配置多个值  many
 * 静态参数：一次只能配置一个值  only
 * 请求方式：get
 * 要传递的参数：sel：[only或many]
 * categories/:id/attributes
 */
export function getCateIdAttribute(cat_id,type='many') {
    return request({
        url: `categories/${cat_id}/attributes`,
        method: 'get',
        params: {sel:type}, //默认指定动态参数many，也可由用户传递only来指定静态参数
    })
}

/**
 * 获取商品接口
 */
export function addGoods(data) {
    return request({
        url: `goods`,
        method: 'post',
        data
    })
}



 






 