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
	  			this.getLive(1)
	  		}, 300)
	  },
	  methods: {
		  getLive(id) {
			 new Aliplayer({
				   id: "J_prismPlayer",
				        source:
				          "https://outin-80aa088e335f11eda17f00163e1c955c.oss-cn-shanghai.aliyuncs.com/sv/1726be4e-18336d2cd9a/1726be4e-18336d2cd9a.mp4?Expires=1663080913&OSSAccessKeyId=LTAI3DkxtsbUyNYV&Signature=IOEewyrkuYr3ArC3ofEaUDfU048%3D",
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