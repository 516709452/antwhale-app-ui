import request from '@/utils/request'
//获取视频播放地址
export function queryVodAliyunAddress(data) {
  return request({
    'url': 'antwhale-web-dowork/vod/queryVodAliyunAddress',
    'method': 'post',
	'data': data
  })
}
//获取视频播放凭证
export function queryVodAliyunPalyAuth(data) {
  return request({
    'url': 'antwhale-web-dowork/vod/queryVodAliyunPalyAuth',
    'method': 'post',
	'data': data
  })
}