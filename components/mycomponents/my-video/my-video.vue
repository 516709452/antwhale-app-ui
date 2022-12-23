<template>
	<view>
	<div id="J_prismPlayer">
		
	</div>
	</view>
</template>

<script>
	export default {
	  name: "myVideo",
	  data() {
	    return {
	    }
	  },
	  onLoad: function() {
	  	setTimeout(()=>{
			debugger
	  			this.getLive(1)
	  		}, 300)
	  },
	  methods: {
		  getLive(id) {
			 new Aliplayer({
				   id: "J_prismPlayer",
				        source:
				          "https://outin-27eb41ff7eab11ed8ca600163e10c0b7.oss-cn-beijing.aliyuncs.com/sv/3ba91332-1852de48fb4/3ba91332-1852de48fb4.mp4?Expires=1671790327&OSSAccessKeyId=LTAI4FocoL6tuCdYhuvug6Ee&Signature=yhp24BnkkvuCBuKo%2FxkzsOT2ynk%3D",
				        width: "100%",
				        height: "500px",
				        /* To set an album art, you must set 'autoplay' and 'preload' to 'false' */
				        autoplay: false,
				        preload: false,
				        isLive: false,
			    // id: 'J_prismPlayer',
			    // mediaAuth: '<your mediaAuth>',//视频的播放凭证，可以在通用媒体管理服务控制台获取。
			    },function(player){	
			      console.log('The player is created.')
			    });
			  	
			  // 也可以使用replayByMediaAuth函数切换不同的mediaAuth播放（前提是已经使用mediaAuth初始化播放器）。
			  // player.replayByMediaAuth('another mediaAuth');
			  }
		}
		  
	}
</script>

<style>
</style>