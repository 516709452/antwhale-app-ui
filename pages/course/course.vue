<template>
	<view class="outer-view">
		<u-row>
			<!-- <u-swiper :list="" keyName="url" :autoplay="false"></u-swiper> -->
		</u-row>
		<u-row>
			<uni-card :is-shadow="true" margin="5px" :title="teacherInfo.name" :sub-title="teacherInfo.career" :extra="teacherInfo.level" :thumbnail="teacherInfo.avatar">
				<text class="uni-body">{{teacherInfo.intro}}</text>
			</uni-card>
		</u-row>
		<u-row>
			<uni-section title="课程大纲" type="line" style="width: 100%;" titleFontSize="16px">
				<u-collapse ref="collapseRef" @change="change" @close="close" @open="open" :accordion="true">
					<u-collapse-item :title="itemChapter.title" :name="itemChapter.id"
						v-for="(itemChapter, indexChapter) in chapterList" :key="indexChapter">
						<u-list ref="videoListRef" @scrolltolower="scrolltolower" :height="videoListHeight">
							<u-list-item v-for="(itemVideo, indexVideo) in videoList" :key="indexVideo">
								<u-cell :title="itemVideo.title"></u-cell>
							</u-list-item>
						</u-list>
					</u-collapse-item>
					<u-cell-group v-if="chapterList.length>=3">
						<u-cell title="查看全部章节" titleStyle="text-align:center" isLink
							:url="`/pages/course/chapter?courseId=${courseId}`"></u-cell>
					</u-cell-group>
				</u-collapse>
			</uni-section>
		</u-row>
		<view class="goods-nav-footer">
			<view>
				<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryChapterInfo
	} from '@/api/course/chapter.js'
	import {
		queryTeacherInfo
	} from '@/api/course/teacher.js'
	import {
		isNull
	} from '@/utils/validUtil.js'
	export default {
		data() {
			return {
				courseId: '', //课程子目录id
				teacherId: '', //课程讲师Id
				current: 1,
				size: 10,
				courseIdlist: [], //该账号拥有的课程id列表
				teacherInfo: {}, //讲师信息
				chapterList: [], //章节列表
				videoList: [], //课程列表
				videoListHeight: '250rpx', //videoList列表高度
				avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png',
				options: [{
					icon: 'chat',
					text: '客服'
				}],
				customButtonGroup: [{
					text: '立即购课',
					backgroundColor: 'linear-gradient(90deg, #1E83FF, #0053B8)',
					color: '#fff'
				}]
			}
		},
		onLoad: function(option) {
			this.courseId = option.courseId
			this.teacherId = option.teacherId
			this.courseIdlist = this.$store.state.user.courseId
			if (this.courseIdlist.indexOf(this.courseId) !== -1) {
				this.customButtonGroup[0].text = "立即观看"
			} else {
				this.customButtonGroup[0].text = "立即购课"
			}
			let teacherParam = {
				id: this.teacherId
			}
			queryTeacherInfo(teacherParam).then(res => {
				if(res.data.records.length>0){
					this.teacherInfo = res.data.records[0]
				}
				let chapterParam = {
					courseId: this.courseId,
				}
				queryChapterInfo(chapterParam).then(res => {
					if (res.data.length >= 3) {
						this.chapterList = res.data.slice(0, 3)
					} else {
						this.chapterList = res.data
					}
				}).catch(
					err => {
						console.log(err)
					})
			}).catch(
				err => {
					console.log(err)
				})
		},
		methods: {
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				this.options[2].info++
			},
			open(e) {
				this.videoList = []
				this.chapterList.forEach(chapter => {
					if (chapter.id !== e) {
						return;
					}
					this.videoList = chapter.children
				})
			},
			close(e) {
				this.videoList = []
			},
			change(e) {}
		}
	}
</script>

<style>
	uni-page-body,
	html,
	body {
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.outer-view {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.goods-nav-footer {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	;
</style>
