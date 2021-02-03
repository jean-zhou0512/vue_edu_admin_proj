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
        <el-form-item label="讲师头像">
          <!--头像缩略图-->
          <PanThumb image="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1091405991,859863778&fm=26&gp=0.jpg"></PanThumb>
          <!--文件上传按钮-->
          <el-button type="primary" icon="el-icon-upload"
          >更换头像</el-button>

          <!--
          value:是否显示上传组件
          :key:类似于id，如果一个页面多个图片上传控件，可以做区分
          :url: 后台上传的url地址
          @close:关闭上传组件
          @crop-upload-success:上传成后的回调
          -->
          <ImageCropper
          :value="isUoloadImg"
          url=""></ImageCropper>
        </el-form-item>

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
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'
    export default {
      name: "",
      components:{ImageCropper,PanThumb},
      data(){
        return {
          teacher:{
            name:'',
            intro:'',
            career:'',
            level:'',
            avatar: '',
          },
          isUoloadImg:false,
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
        if(this.$route.params && this.$route.params.id){
          this.qryTeacherById(this.$route.params.id)
        }
      },
      methods:{
        saveOrUpdate(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(this.teacher.id){
                this.updateTeacher();
              }else{
                this.createTeacher();
              }
            }
          })
        },
        initData(){
          dictApi.qryDictListByType(dictApi.dictTypes.TEACHER_TITL)
            .then(response => {
              this.teacherTitleList = response.data.dictList
            })
        },
        resetForm(formName){
          this.$refs[formName].resetFields()
        },
        qryTeacherById(id){
          teacherApi.qryTeacherById(id)
            .then(response => {
              this.teacher = response.data.teacher
            })
        },
        createTeacher(){
          teacherApi.createTeacher(this.teacher)
            .then(response=>{
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.$router.push({path:'/teacher/list'})
            });
            },
            updateTeacher(){
              teacherApi.updateTeacher(this.teacher)
                .then(response=>{
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  this.$router.push({path:'/teacher/list'})
                })
            }
        },
    }
</script>

<style scoped>

</style>
