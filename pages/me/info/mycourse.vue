<template>
	<view>
		<uni-list v-if="this.courseIds.length!==0" :border="true">
			<!-- 显示圆形头像 -->
			<uni-list-item :title="item.title" link :to="`/pages/course/chapter?courseId=${item.id}`"
				v-for="(item, index) in cousreList" :key="index">
				<template v-slot:header>
					<view class="uni-thumb">
						<image :src="item.cover" mode="widthFix"></image>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<u-empty v-else mode="search" icon="http://cdn.uviewui.com/uview/empty/car.png">
		</u-empty>
	</view>
</template>

<script>
	import {
		queryCourseInfo
	} from '@/api/course/course.js'
	import {
		isNull
	} from '@/utils/validUtil.js'
	export default {
		data() {
			return {
				cousreList: [], //课程列表
				courseIds: this.$store.state.user.courseId,
				current: 1,
				size: 10,
			}
		},
		onLoad() {
			this.getCourseInfo()
		},
		methods: {
			//课程列表
			getCourseInfo() {
				if (this.courseIds.length === 0) {
					return
				}
				let courseParam = {
					courseIdList: this.courseIds,
					currentPage: this.current,
					pageSize: this.size
				}
				queryCourseInfo(courseParam).then(res => {
					this.cousreList = res.data.records
				}).catch(
					err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style>
	/* 略缩图 */
	.uni-thumb {
		flex-shrink: 0;
		margin-right: $uni-spacing-row-base;
		width: 125px;
		height: 75px;
		border-radius: $uni-border-radius-lg;
		overflow: hidden;
		border: 1px #f5f5f5 solid;

	/* 	image {
			width: 100%;
			height: 100%;
		} */
	}
</style>
