<template>
  <div class="app-container">
    <CourseSteps :active="active"/>


    <el-form label-width="120px" :model="courseInfo" :rules="rulesCourse" ref="courseInfo" class="demo-ruleForm" v-if="active == 0">
      <el-form-item label="课程标题" prop="title">
        <el-input v-model="courseInfo.title"
        placeholder="示例：机器学习项目课：从基础到搭建项目视频"></el-input>
      </el-form-item>

      <!-- 所属分类 TODO -->
      <el-form-item label="所属分类" prop="subject">
          <el-cascader
            v-model="courseInfo.subject"
            :options="subjectTree"
            :props="subjectProps"
            @change="handleChange"></el-cascader>
      </el-form-item>

      <!-- 课程讲师 TODO -->
      <el-form-item label="课程讲师" prop="teacherId">
        <el-select v-model="courseInfo.teacherId" filterable placeholder="课程讲师">
          <el-option v-for="teacher in teacherList" :label="teacher.name" :value="teacher.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="总课时" prop="lessonNum">
        <el-input-number :min="0" v-model="courseInfo.lessonNum"
        controls-position="right" placeholder="课时数"></el-input-number>
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介" prop="description">
        <el-input v-model="courseInfo.description"
                  placeholder="课程简介"></el-input>
      </el-form-item>

      <!-- 课程封面 TODO -->

      <el-form-item label="课程价格" prop="price">
        <el-input-number :min="0" v-model="courseInfo.price"
        controls-position="right"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next('courseInfo')">保存并下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form label-width="120px" :model="courseChapter" :rules="rulesChapter" ref="courseChapter" class="demo-ruleForm" v-if="active == 1">
      表单2
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="prev()">返回上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next('courseChapter')">保存并下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form label-width="120px" :model="coursePublish" :rules="rulesPublish" ref="coursePublish" class="demo-ruleForm" v-if="active == 2">
      表单3
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="prev()">返回上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next('coursePublish')">发布课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import CourseSteps from '@/components/CourseSteps'
  import teacherApi from '@/api/edu/teacher'
  import subjectApi from '@/api/edu/subject'
  export default {
    name: "CourseSave",
    components:{CourseSteps},
    data(){
      return {
        active:0,
        saveBtnDisabled:false,
        courseInfo:{
          title: '',
          subject:'',
          subjectId: '',
          subjectParentId:'',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: '',
          price: 0
        },
        courseChapter:{},
        coursePublish:{},
        rulesCourse:{
          title:[
            { required: true, message: '请输入课程标题', trigger: 'blur' },
            {  max: 50, message: '不超过50个字符', trigger: 'blur' }
          ],
          lessonNum:[
            { required: true, message: '请输入课时数', trigger: 'blur' },
          ],
          description:[
            { required: true, message: '请输入简介内容', trigger: 'blur' },
          ],
          price:[
            { required: true, message: '请输入课时价格', trigger: 'blur' },
          ],
          subjectId:[
            { required: true, message: '请选择课程分类', trigger: 'blur' },
          ],
          teacherId:[
            { required: true, message: '请选择课程讲师', trigger: 'blur' },
          ]
        },
        rulesChapter:{},
        rulesPublish:{},
        dialogTableVisible:false,
        teacherList:[],
        subjectTree:[],
        subjectProps:{
          expandTrigger: 'hover',
          value:'id',
          label:'title',
          children:'nodes'

        }
      }
    },
    created(){
      this.initTeacher()
      this.initSubject()
    },
    methods:{
      next(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.active == 0){
              this.active = 1
              console.log(this.courseInfo)
            }else if(this.active == 1){
              this.active = 2
            }else if(this.active == 2){
              console.log('第三步啦')
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      prev(){
        if(this.active == 2){
          this.active = 1
        }else if(this.active == 1){
          this.active = 0
        }
      },
      initTeacher(){
        teacherApi.qryAllTeacher()
          .then(response => {
            this.teacherList = response.data.eduTeacherList
          })
      },
      initSubject(){
        subjectApi.getSubjectTree()
          .then(response => {
            this.subjectTree = this.getTreeData(response.data.subjectTree)
          })
      },
      // 递归判断列表，把最后的children设为undefined
      getTreeData(data){
        for(var i=0;i<data.length;i++){
          if(data[i].nodes.length<1){
            // children若为空数组，则将children设为undefined
            data[i].nodes=undefined;
          }else {
            // children若不为空数组，则继续 递归调用 本方法
            this.getTreeData(data[i].nodes);
          }
        }
        return data;
      },
      handleChange(value) {
        this.courseInfo.subjectId = value[1]
        this.courseInfo.subjectParentId = value[0]
      }
    }
  }
</script>

<style scoped>

</style>
