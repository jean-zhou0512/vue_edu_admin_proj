<template>
  <div>
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="active" process-status="wait" finish-status="success" style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>
  </div>
</template>

<script>
    export default {
        name: "CourseSteps",
      props: {
        active:Number,
        default:0,
      }
    }
</script>

<style scoped>

</style>
