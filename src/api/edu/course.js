import request from '@/utils/request'

export default {
  qryCourseInfo(courseId){
    return request({
      url:`/eduservice/course/qryCourseInfo/${courseId}`,
      method:'get'
    })
  }
}
