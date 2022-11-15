<template>
	<view class="container">
	  <uni-list>
	    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person-filled'}" title="昵称" :rightText="user.nickName" />
	    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone-filled'}" title="手机号码" :rightText="user.phonenumber" />
	    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'email-filled'}" title="邮箱" :rightText="user.email" />
	    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'auth-filled'}" title="岗位" :rightText="postGroup" />
	    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'staff-filled'}" title="角色" :rightText="roleGroup" />
	    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'calendar-filled'}" title="创建日期" :rightText="user.createTime" />
	  </uni-list>
	</view>
</template>

<script>
	import {
		getUserInfo
	} from "@/api/login"

	export default {
		data() {
			return {
				user: {},
				roleGroup: "",
				postGroup: ""
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				let userInfo = {
					commonUserinfoId: this.$store.state.user.userId
				}
				getUserInfo(userInfo).then(response => {
					this.user = response.data.records[0]
					this.roleGroup = response.roleGroup
					this.postGroup = response.postGroup
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.cu-avatar {
		border: 2px solid #eaeaea;

		.icon {
			font-size: 170px;
		}
	}

	.demo-uni-col {
		height: 36px;
		border-radius: 5px;
	}
</style>
