<template>
  <div class="app-container">
    <CourseSteps :active="active"></CourseSteps>

    <el-form label-width="120px">
      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下
          一步</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import CourseSteps from '@/components/courseSteps'
    export default {
      name: "chapter",
      components:{CourseSteps},
      data(){
          return{
            active:1,
            saveBtnDisabled:false
          }
      },
      methods:{
        previous(){
          this.$router.push({path:'/course/info/1'})
        },
        next() {
          this.$router.push({path:'/course/publish/1'})
        }
      }
    }
</script>

<style scoped>

</style>
