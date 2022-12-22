import request from '@/utils/request'
//获取课程列表
export function queryCourseInfo(data) {
  return request({
    'url': 'antwhale-edu-dowork/course/queryCourse',
    'method': 'post',
	'data': data
  })
}