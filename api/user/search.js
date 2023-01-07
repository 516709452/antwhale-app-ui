import request from '@/utils/request'
//查询用户-课程映射表
export function queryUserCourse(data) {
  return request({
    'url': 'antwhale-user-dowork/userinfo/userCourseQuery?userId='+data,
    'method': 'get',
  })
}