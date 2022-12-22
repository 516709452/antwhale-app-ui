import request from '@/utils/request'
//获取课程分类目录
export function queryChapterInfo(data) {
  return request({
    'url': 'antwhale-edu-dowork/course/queryChapter',
    'method': 'post',
	'data': data
  })
}