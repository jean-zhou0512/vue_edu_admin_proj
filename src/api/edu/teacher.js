import request from '@/utils/request'

export default {

  getTeacherPageList(currentPage,pageSize,teacherQuery){
    return request({
      url:`/teacher/pageTeacherCondition/${currentPage}/${pageSize}`,
      method: 'post',
      data:JSON.stringify(teacherQuery),
      headers:{'Content-Type':'application/json'}
    })
  },
  deleteTeacherById(id){
    return request({
      url:`/teacher/deleteTeacher/${id}`,
      method:'delete',
    })
  },
  createTeacher(teacher){
    return request({
      url:'/teacher/createTeacher',
      method:'post',
      headers:{'Content-Type':'application/json'},
      data:JSON.stringify(teacher)
    })
  },
  qryTeacherById(id){
    return request({
      url:`/teacher/qryTeacherById/${id}`,
      method:'get'
    })
  },
  updateTeacher(teacher){
    return request({
      url:'/teacher/updateTeacher',
      method:'post',
      headers:{'Content-Type':'application/json'},
      data:JSON.stringify(teacher)
    })
  }

}
