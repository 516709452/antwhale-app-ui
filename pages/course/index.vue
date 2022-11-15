<template>
	<view>
		<tui-tabs :tabs="tabs" :currentTab="currentTab" @change="changeTab" />
		<uni-list :border="true">
			<!-- 显示圆形头像 -->
			<uni-list-item title="列表左侧带略缩图" note="列表描述信息" rightText="右侧文字">
				<template v-slot:header>
					<view class="uni-thumb">
						<image src="/static/logo.png" mode="aspectFill"></image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				info: [{
						colorClass: 'uni-bg-red',
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg',
						content: '内容 C'
					}
				],
				current: 0,
				mode: 'round',
				swiperDotIndex: 0,
				currentTab: 0,
				tabs: [{
					name: "训练课程",
					disabled: true
				}, {
					name: "饮食课程",
					disabled: true
				}, {
					name: "基础课程",
					disabled: true
				}]
			}
		},
		onLoad() {},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			changeTab(n) {
				this.currentTab = n.index
			}
		}
	}
</script>

<style lang="scss">
	/* 略缩图 */
	.uni-thumb {
		flex-shrink: 0;
		margin-right: $uni-spacing-row-base;
		width: 125px;
		height: 75px;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		border: 1px #f5f5f5 solid;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
