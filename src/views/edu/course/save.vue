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
<!--        <el-input v-model="courseInfo.description"-->
<!--                  placeholder="课程简介"></el-input>-->
        <MyTinymce :tinymceHeight ="300" @changeValue="changeValue" :tinymceHtml="courseInfo.description" ref="myTinymce" />

      </el-form-item>

      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面" prop="cover">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :before-remove="beforeRemove"
          :file-list="fileList"
          :limit="1"
          list-type="picture"
          :on-success="uploadFileSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip upload_tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程价格" prop="price">
        <el-input-number :min="0" v-model="courseInfo.price"
        controls-position="right"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next('courseInfo')">保存并下一步</el-button>
      </el-form-item>
    </el-form>

    <el-form label-width="120px" :model="courseChapter" :rules="rulesChapter" ref="courseChapter" class="demo-ruleForm" v-if="active == 1">
      <el-button type="text">添加章节</el-button>
      <ul class="chapterList">
        <li v-for="chapter in chapterList" :key="chapter.id">
          <p>
            {{chapter.title}}
            <span class="acts">
              <el-button type="text">添加课时</el-button>
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
            </span>
          </p>

          <!--视频-->
          <ul class="chapterList videoList">
            <li v-for="video in chapter.eduVideoList" :key="video.id">
              <p>{{video.title}}</p>
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </li>
          </ul>

        </li>
      </ul>


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
  import MyTinymce from '@/components/MyTinymce'
  import courseApi from '@/api/edu/course'
  export default {
    name: "CourseSave",
    components:{CourseSteps,MyTinymce},
    data(){
      return {
        active:0,
        saveBtnDisabled:false,

        //课程信息
        courseInfo:{
          title: '',
          subject:[],
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
          // title:[
          //   { required: true, message: '请输入课程标题', trigger: 'blur' },
          //   {  max: 50, message: '不超过50个字符', trigger: 'blur' }
          // ],
          // lessonNum:[
          //   { required: true, message: '请输入课时数', trigger: 'blur' },
          // ],
          // description:[
          //   { required: true, message: '请输入简介内容', trigger: 'change' },
          // ],
          // price:[
          //   { required: true, message: '请输入课时价格', trigger: 'blur' },
          // ],
          // subject:[
          //   { required: true, message: '请选择课程分类', trigger: 'change' },
          // ],
          // teacherId:[
          //   { required: true, message: '请选择课程讲师', trigger: 'change' },
          // ]
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

        },
        fileList:[{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        uploadUrl:process.env.VUE_APP_BASE_API+'/ossservice/oss/uploadAvatar',

        //课程章节
        chapterList:[],
      }
    },
    created(){
      this.initSubject()
      this.initTeacher()
      if(this.$route.params && this.$route.params.id){
        this.getCourseInfo(this.$route.params.id)
      }
    },
    methods:{
      getCourseInfo(courseId){
        courseApi.qryCourseInfo(courseId)
          .then(responese => {
            this.courseInfo.title = responese.data.eduCourse.title
            this.courseInfo.subject.push(responese.data.eduCourse.subjectParentId )
            this.courseInfo.subject.push(responese.data.eduCourse.subjectId)
            this.courseInfo.subjectParentId = responese.data.eduCourse.subjectParentId
            this.courseInfo.teacherId = responese.data.eduCourse.teacherId
            this.courseInfo.lessonNum = responese.data.eduCourse.lessonNum
            this.courseInfo.cover = responese.data.eduCourse.cover
            this.courseInfo.price = responese.data.eduCourse.price

            if(responese.data.eduCourseDescription != null && responese.data.eduCourseDescription != ''){
              this.courseInfo.description = responese.data.eduCourseDescription.description
            }

            this.chapterList = responese.data.eduChapterList
          })
      },
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
      },
      beforeRemove(file,fileList){
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleRemove(file, fileList) {
        // return this.$confirm(`确定移除 ${ file.name }？`);
        this.courseInfo.cover = '';
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      uploadFileSuccess(files, fileList){
        this.courseInfo.cover = files.data.url
      },
      changeValue(value){
        this.courseInfo.description = value
      }
    },
  }
</script>

<style scoped>
.upload_tip{
  color:red;
}

chapterList{
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>
