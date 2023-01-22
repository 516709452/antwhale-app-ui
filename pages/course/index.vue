<template>
	<view>
		<u-row>
			<u-search placeholder="搜索课程" @focus="openSearchPage" shape="round" :clearabled="true" :showAction="false"
				bgColor="#f2f2f2" borderColor="#cccacc"></u-search>
		</u-row>
		<u-row align="top">
			<u-col span="3">
				<uni-list>
					<uni-list-item v-for="(item, index) in subjectList" :key="index" @click="getSubjectSonInfo(item.id)"
						clickable>
						<template v-slot:body>
							<view class="slot-box">
								<text class="slot-text">{{item.label}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
				<!-- <u-cell-group :customStyle="{'height': '30px'}">
					<u-cell :title="item.label" v-for="(item, index) in subjectList" :key="index"
						@click="getSubjectSonInfo(item.id)" :titleStyle="{'font-size': '13px'}"></u-cell>
				</u-cell-group> -->
			</u-col>
			<u-col span="9" :customStyle="{'background-color': '#ffffff'}">
				<view v-if="subjectSonList.length===0">
					<u-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/car.png">
					</u-empty>
				</view>
				<view v-else>
					<u-tabs :list="subjectSonList" @click="getCourseInfo" :activeStyle="{
            color: '#303133',
            fontWeight: 'bold',
            transform: 'scale(1.05)',
        }" :inactiveStyle="{
            color: '#606266',
            transform: 'scale(1)',
			fontSize: '12px'
        }" itemStyle="padding-left: 13px; padding-right: 13px; height: 34px;"></u-tabs>
					<uni-list :border="true">
						<!-- 显示圆形头像 -->
						<uni-list-item :title="item.title" link :to="`/pages/course/course?courseId=${item.id}&teacherId=${item.teacherId}`"
							:note="`浏览量:${item.buyCount}`" :rightText="`${item.price}￥`"
							v-for="(item, index) in cousreList" :key="index">
							<template v-slot:header>
								<view class="uni-thumb">
									<image :src="item.cover" mode="aspectFill"></image>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
					<uni-load-more :status="loadmore" :contentText="contentText"></uni-load-more>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import {
		querySubjectInfo
	} from '@/api/course/subject.js'
	import {
		queryCourseInfo
	} from '@/api/course/course.js'
	import {
		isNull
	} from '../../utils/validUtil'

	export default {
		components: {},
		data() {
			return {
				subjectList: [], //课程目录
				subjectSonList: [], //课程子目录
				cousreList: [], //课程列表
				mode: 'round',
				current: 1,
				size: 10,
				ifBottomRefresh: false,
				loadmore: 'more',
				contentText: {
					"contentdown": "加载更多课程",
					"contentrefresh": "加载中...",
					"contentnomore": "暂无更多课程"
				},
				tempStyle: ''
			}
		},
		onLoad() {
			this.getSubjectInfo()
		},
		methods: {
			change(e) {},
			clickItem(e) {},
			changeTab(n) {},
			openSearchPage() {
				uni.navigateTo({
					url: '/pages/search/index'
				});
			},
			//课程类目
			getSubjectInfo() {
				querySubjectInfo().then(async res => {
					this.subjectList = res.data
					this.getSubjectSonInfo(res.data[0].id)
				}).catch(
					err => {
						console.log(err)
					})
			},
			//课程子类目
			getSubjectSonInfo(subjectId) {
				this.subjectSonList = []
				this.subjectList.forEach(subject => {
					if (subject.id !== subjectId) {
						return
					}
					subject.children.forEach(subjectChildren => {
						let subjectSon = {}
						subjectSon.name = subjectChildren.label
						subjectSon.id = subjectChildren.id
						this.subjectSonList.push(subjectSon)
					})
					this.getCourseInfo(this.subjectSonList[0])
				})
			},
			//课程列表
			getCourseInfo(subjectSon) {
				if (isNull(subjectSon)) {
					return;
				}
				let courseParam = {
					subjectId: subjectSon.id,
					status: "Normal",
					currentPage: this.current,
					pageSize: this.size
				}
				queryCourseInfo(courseParam).then(res => {
					//判断是触底加载还是第一次进入页面的加载
					if (this.ifBottomRefresh) {
						this.cousreList = this.cousreList.concat(res.data.records)
					} else {
						this.cousreList = res.data.records
					}
					this.ifBottomRefresh = false
					this.loadmore = this.cousreList.length < res.data.total ? 'more' : 'noMore'
				}).catch(
					err => {
						console.log(err)
					})
			},
			onReachBottom() {
				debugger
				console.log('触底')
				this.current += 1
				// 没有更多数据之后 就不会在触底加载
				if (this.loadmore === 'noMore') return
				this.ifBottomRefresh = true
				this.loadmore = loading
				this.getCourseInfo(this.subjectSon) // 触底 拉取数据
			}
		}
	}
</script>
<style>
	page {
		background-color: #fff;
	}
</style>
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

	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-text {
		flex: 1;
		font-size: 12px;
	}
</style>
