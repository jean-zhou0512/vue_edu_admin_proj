import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    // url:'/user/login',
    // method: 'post',
    // data
    url:'/eduservice/user/login',
    method:'post',
    data: qs.stringify(data),   // 用 qs 将js对象转换为字符串 'name=edward&age=25'
  })
}

export function getInfo(token) {
  // return request({
  //   // url: '/vue-admin-template/user/info',
  //   url:'/eduservice/user/info',
  //   method:'post',
  //   params:{token}
  // })
  return request({
    url:'/eduservice/user/info',
    method:'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
