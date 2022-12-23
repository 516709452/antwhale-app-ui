<template>
	<view>
		<u-row align="top">
			<u-col span="3">
				<u-cell :title="item.label" v-for="(item, index) in subjectList" :key="index"
					@click="getSubjectSonInfo(item.id)">
				</u-cell>
			</u-col>
			<u-col span="9">
				<view v-if="subjectSonList.length===0">
					<u-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/car.png">
					</u-empty>
				</view>
				<view v-else>
					<u-tabs :list="subjectSonList" @click="getCourseInfo"></u-tabs>
					<uni-list :border="true">
						<!-- 显示圆形头像 -->
						<uni-list-item :title="item.title" link :to="`/pages/course/course?courseId=${item.id}`"
							:note="`浏览量:${item.buyCount}`" :rightText="`${item.price}￥`"
							v-for="(item, index) in cousreList" :key="index">
							<template v-slot:header>
								<view class="uni-thumb">
									<image :src="item.cover" mode="aspectFill"></image>
								</view>
							</template>
						</uni-list-item>
					</uni-list>
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

	export default {
		components: {},
		data() {
			return {
				subjectList: [], //课程目录
				subjectSonList: [], //课程子目录
				cousreList: [], //课程列表
				mode: 'round',
			}
		},
		onLoad() {
			this.getSubjectInfo()
		},
		methods: {
			change(e) {},
			clickItem(e) {},
			changeTab(n) {},
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
				let courseParam = {
					subjectId: subjectSon.id
				}
				queryCourseInfo(courseParam).then(res => {
					this.cousreList = res.data
				}).catch(
					err => {
						console.log(err)
					})
			},
			//点击课程进入课程详细页面
			gotoCoursePage(subjectSon) {
				console.log(subjectSon)
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
