<template>
	<view>
		<view v-if="playURL">
			<video id="myVideo" class="myVideoStyle" :src="playURL" controls></video>
		</view>
		<!-- <view id="J_prismPlayer">

		</view> -->
		<uni-section title="课程大纲" type="line" style="width: 100%;" titleFontSize="16px">
			<u-collapse ref="collapseRef" @change="change" @close="close" @open="open" :accordion="true">
				<u-collapse-item :title="itemChapter.title" :name="itemChapter.id"
					v-for="(itemChapter, indexChapter) in chapterList" :key="indexChapter">
					<u-list ref="videoListRef" @scrolltolower="scrolltolower" :height="videoListHeight">
						<u-list-item v-for="(itemVideo, indexVideo) in videoList" :key="indexVideo">
							<u-cell :title="itemVideo.title" @click="getVideoUrl(itemVideo)">
								<u-tag v-if="itemVideo.isFree" text="免费试听" size="mini" type="success" plain
									:absolute="false" slot="right-icon"></u-tag>
							</u-cell>
						</u-list-item>
					</u-list>
				</u-collapse-item>
			</u-collapse>
		</uni-section>
	</view>
</template>

<script>
	import {
		queryChapterInfo
	} from '@/api/course/chapter.js'
	import {
		queryVodAliyunPalyAuth,
		queryVodAliyunAddress
	} from '@/api/course/vod.js'
	import {
		isNull
	} from '@/utils/validUtil.js'
	export default {
		data() {
			return {
				courseId: '', //课程子目录id
				courseIdlist: [], //该账号拥有的课程id列表
				chapterList: [], //章节列表
				videoList: [], //课程列表
				videoListHeight: '250rpx', //videoList列表高度
				playURL: '', //播放地址
				videoPlayer: null
			}
		},
		onLoad: function(option) {
			this.courseId = option.courseId
			this.courseIdlist = this.$store.state.user.courseId
			let chapterParam = {
				courseId: this.courseId
			}
			queryChapterInfo(chapterParam).then(async res => {
				this.chapterList = res.data
				let videoSourceId = this.chapterList[0].children[0].videoSourceId
				let vodAliyunAddressParamDTO = {
					videoId: videoSourceId
				}
				await this.getVodAliyunAddress(vodAliyunAddressParamDTO);
			}).catch(
				err => {
					console.log(err)
				})
		},
		methods: {
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
			change(e) {},
			getLive() {
				this.videoPlayer = new Aliplayer({
					id: "J_prismPlayer",
					source: this.playURL,
					width: "100%",
					height: "200px",
					/* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
					autoplay: false,
					preload: false,
					isLive: false,
					skinLayout: [{
						name: "bigPlayButton",
						align: "blabs",
						x: 10,
						y: 10
					}]
					// id: 'J_prismPlayer',
					// playauth: this.palyAyth,//视频的播放凭证，可以在通用媒体管理服务控制台获取。
				}, function(player) {
					player.play()
				});

				// 也可以使用replayByMediaAuth函数切换不同的mediaAuth播放（前提是已经使用mediaAuth初始化播放器）。
				// player.replayByMediaAuth('another mediaAuth');
			},
			//得到视频播放地址
			async getVodAliyunAddress(vodAliyunAddressParamDTO) {
				await queryVodAliyunAddress(vodAliyunAddressParamDTO).then(res => {
					this.playURL = res.data.body.playInfoList.playInfo[0].playURL
					
					setTimeout(() => {
						this.videoContext = uni.createVideoContext('myVideo')
						this.videoContext.stop()
						this.videoContext.play()
					}, 60)
				}).catch(
					err => {
						console.log(err)
					})
			},
			//点击小节列表播放视频
			async getVideoUrl(video) {
				if (this.courseIdlist.indexOf(this.courseId) === -1) {
					if (!video.isFree) {
						this.$modal.msgError("请购买后观看")
						return
					}
				}
				let videoSourceId = video.videoSourceId
				if (isNull(videoSourceId)) {
					this.$modal.msgError("该小节还未上传视频")
					return
				}
				let vodAliyunAddressParamDTO = {
					videoId: videoSourceId
				}
				// this.videoPlayer.dispose();
				await this.getVodAliyunAddress(vodAliyunAddressParamDTO);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myVideoStyle {
		width: 100%
	}
</style>
