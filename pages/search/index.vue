<template>
	<view>
		<u-navbar rightText="搜索" rightIcon="search" @rightClick="rightClick" :autoBack="true">
			<view slot="center">
				<u-search placeholder="搜索课程" shape="round" :clearabled="true"
					:showAction="false" ></u-search>
			</view>
		</u-navbar>
	</view>
</template>

<script>
</script>

<style>
</style>
