import request from '@/utils/request'
//获取课程分类目录
export function querySubjectInfo(data) {
  return request({
    'url': 'antwhale-edu-dowork/course/querySubject',
    'method': 'post',
	'data': data
  })
}