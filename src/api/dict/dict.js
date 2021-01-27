import request from '@/utils/request'
const dictTypes = {
  TEACHER_TITL:'teacher_title',
}

export default {
  dictTypes,
  qryDictListByType(dictType){
    return request({
      url:`/dict/qryDictListByType/${dictType}`,
      method: 'get',
    })
  }
}

