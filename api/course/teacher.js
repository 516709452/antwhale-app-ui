import request from '@/utils/request'
//获取课程列表
export function queryTeacherInfo(data) {
  return request({
    'url': 'antwhale-edu-dowork/teacher/queryTeacher',
    'method': 'post',
	'data': data
  })
}