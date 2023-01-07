import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import {
	login,
	logout,
	getInfo
} from '@/api/login'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'
import {
	isNull
} from '@/utils/validUtil.js'

const baseUrl = config.baseUrl

const user = {
	state: {
		token: getToken(),
		name: storage.get(constant.name),
		avatar: storage.get(constant.avatar),
		roles: storage.get(constant.roles),
		permissions: storage.get(constant.permissions),
		userId: storage.get(constant.userId),
		courseId: storage.get(constant.courseId),
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, name) => {
			state.name = name
			storage.set(constant.name, name)
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
			storage.set(constant.avatar, avatar)
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
			storage.set(constant.roles, roles)
		},
		SET_PERMISSIONS: (state, permissions) => {
			state.permissions = permissions
			storage.set(constant.permissions, permissions)
		},
		SET_USERID: (state, userId) => {
			state.userId = userId
			storage.set(constant.userId, userId)
		},
		SET_COURSEID: (state, courseId) => {
			state.courseId = courseId
			storage.set(constant.courseId, courseId)
		}
	},

	actions: {
		// 登录
		Login({
			commit
		}, userInfo) {
			const username = userInfo.username.trim()
			const password = userInfo.password
			const code = userInfo.code
			const uuid = userInfo.uuid
			return new Promise((resolve, reject) => {
				login(username, password, code, uuid).then(res => {
					setToken(res.data.accessToken)
					commit('SET_TOKEN', res.data.accessToken)
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 设置用户信息
		SetUserInfo({
			commit,
			state
		}, userInfo) {
			const avatar = (isNull(userInfo) || isNull(userInfo.avatar)) ? require("@/static/images/profile.jpg") :
				userInfo.avatar
			const username = (isNull(userInfo) || isNull(userInfo.username)) ? "" : userInfo.username
			const userId = (isNull(userInfo) || isNull(userInfo.userId)) ? "" : userInfo.userId
			if (userInfo.roles && userInfo.roles.length > 0) {
				commit('SET_ROLES', res.roles)
				commit('SET_PERMISSIONS', res.permissions)
			}
			commit('SET_NAME', username)
			commit('SET_AVATAR', avatar)
			commit('SET_USERID', userId)
			commit('SET_COURSEID', userInfo.courseId)
		},

		// 退出系统
		LogOut({
			commit,
			state
		}) {
			return new Promise((resolve, reject) => {
				logout(state.token).then((res) => {
					commit('SET_TOKEN', '')
					commit('SET_ROLES', [])
					commit('SET_PERMISSIONS', [])
					commit('SET_NAME', '')
					commit('SET_AVATAR', '')
					commit('SET_USERID', '')
					commit('SET_COURSEID', [])
					removeToken()
					storage.clean()
					resolve(res)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user
