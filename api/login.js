import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    'url': 'antwhale-auth-dowork/login/goLogin',
	headers: {
	  isToken: false
	},
    'method': 'post',
    'data': data
  })
}

// 获取用户详细信息
export function getUserInfo(data) {
  return request({
    'url': 'antwhale-user-dowork/userinfo/queryCommonUser',
    'method': 'post',
	'data': data
  })
}

// 退出方法
export function logout() {
  return request({
    'url': 'antwhale-auth-dowork/login/goLogout',
    'method': 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    'url': 'antwhale-auth-dowork/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}


// 校验验证码
export function checkCaptcha(data) {
  return request({
    'url': 'antwhale-auth-dowork/checkCaptcha',
    headers: {
      isToken: false
    },
	'data': data,
    method: 'post',
    timeout: 20000
  })
}
