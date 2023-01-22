<template>
	<view>
		<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
			<uni-forms-item label="用户名" required name="username">
				<uni-easyinput v-model="userInfo.username" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="" required name="age">
				<uni-easyinput v-model="userInfo.age" placeholder="请输入鲸健联盟" />
			</uni-forms-item>
			<uni-forms-item label="自我介绍" name="introduction">
				<uni-easyinput type="textarea" v-model="valiFormData.introduction" placeholder="请输入自我介绍" />
			</uni-forms-item>
		</uni-forms>
	</view>
</template>

<script>
	data() {
			return {
				userInfo: {
					username: "",
					userId: "",
					weifenx:""
				}
			}
		},
		methods: {}
</script>

<style>
</style>
