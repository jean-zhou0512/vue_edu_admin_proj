<template>
    <div class="app-container">
      <h3>讲师添加</h3>
      <el-form :rules="rules" ref="teacherForm" :model="teacher" label-width="120px">
        <el-form-item label="讲师名称" prop="name">
          <el-input v-model="teacher.name"></el-input>
        </el-form-item>
        <el-form-item label="头衔" prop="level">
          <el-select v-model="teacher.level" placeholder="请选择讲师头衔">
            <el-option v-for="teacherTitle in teacherTitleList" :label="teacherTitle.dictValueName" :value="teacherTitle.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲师资历" prop="career">
          <el-input v-model="teacher.career"/>
        </el-form-item>
        <el-form-item label="讲师简介" prop="intro">
          <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
        </el-form-item>
        <!-- 讲师头像：TODO -->
        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate('teacherForm')">保存</el-button>
          <el-button @click="resetForm('teacherForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import dictApi from '@/api/dict/dict'
  import teacherApi from '@/api/edu/teacher'
    export default {
      name: "",
      data(){
        return {
          teacher:{
            name:'',
            intro:'',
            career:'',
            level:'',
            avatar: '',
          },
          saveBtnDisabled: false,// 保存按钮是否禁用,
          teacherTitleList:[],
          rules:{
            name:[
              {required:true,message:'请输入讲师名称',trigger:'blur'},
              {min:2,max:5,message:'名字长度在2到5个字符',trigger:'blur'}
            ],
            level:[
              {required:true,message:'请选择讲师头衔',trigger:'change'}
            ],
            career:[
              {required:true,message:'请输入讲师资历',trigger:'blur'}
            ],
            intro:[
              {required:true,message:'请输入讲师简介',trigger:'blur'}
            ]
          }
        }
      },
      created(){
        this.initData();
      },
      methods:{
        saveOrUpdate(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
             teacherApi.createTeacher(this.teacher)
             .then(response=>{
               this.$message({
                 type: 'success',
                 message: '提交成功!'
               })
               this.$router.push({path:'/teacher/list'})
             });
            }
          });
        },
        initData(){
          dictApi.qryDictListByType(dictApi.dictTypes.TEACHER_TITL)
            .then(response => {
              this.teacherTitleList = response.data.dictList
            })
        },
        resetForm(formName){
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>

</style>
