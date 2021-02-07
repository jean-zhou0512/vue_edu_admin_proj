<template>
  <div>
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="active" process-status="wait" finish-status="success" style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"></el-step>
      <el-step title="创建课程大纲"></el-step>
      <el-step title="提交审核"></el-step>
    </el-steps>
  </div>
</template>

<script>
    export default {
      name: "courseSteps",
      props: {
        active: {
          type: Number,
          default: 0
        }
      },
    }
</script>

<style scoped>

</style>
