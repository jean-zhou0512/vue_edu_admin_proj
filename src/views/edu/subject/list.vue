<template>
    <div>
      <el-tree :data="subjectTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
</template>

<script>
  import subjectApi from '@/api/edu/subject.js'
    export default {
        name: "list",
      data() {
        return {
          subjectTree: [],
          defaultProps: {
            children: 'nodes',
            label: 'title'
          }
        };
      },
      created(){
        this.initTree()
      },
      methods: {
        initTree(){
          subjectApi.getSubjectTree()
            .then(response =>{
            this.subjectTree = response.data.subjectTree;
            console.log(this.subjectTree)
          })
        },
        handleNodeClick(data) {
          console.log(data);
        }
      }
    }
</script>

<style scoped>

</style>
