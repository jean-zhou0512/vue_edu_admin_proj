<template>
    <div class="app-container">
     <CourseSteps :active="active"></CourseSteps>

      <el-form label-width="120px">
        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>


<script>
  import CourseSteps from '@/components/courseSteps'
    export default {
    components:{CourseSteps},
      data() {
        return {
          active:0,
          saveBtnDisabled:false
        };
      },
      created(){

      },
      methods: {
        next() {
          this.$router.push({path:'/course/chapter/1'})
        }
      }
    }
</script>

<style scoped>

</style>
