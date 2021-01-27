import request from '@/utils/request'

export default {

  getTeacherPageList(currentPage,pageSize,teacherQuery){
    return request({
      url:`/teacher/pageTeacherCondition/${currentPage}/${pageSize}`,
      method: 'post',
      data:JSON.stringify(teacherQuery),
      headers:{'Content-Type':'application/json'}
    })
  }
}
