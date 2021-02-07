<template>
  <div class="app-container">
    <CourseSteps :active="active"></CourseSteps>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">发布课程</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import CourseSteps from '@/components/courseSteps'
  export default {
    name: "publish",
    components:{CourseSteps},
    data(){
      return{
        active:2,
        saveBtnDisabled:false
      }
    },
    methods:{
      previous(){
        this.$router.push({path:'/course/chapter/1'})
      },
      next() {
        this.$router.push({path:'/course/list'})
      }
    }
  }
</script>

<style scoped>

</style>
