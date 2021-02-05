<template>
    <div>
      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-tree
        class="filter-tree"
        :data="subjectTree"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree">
      </el-tree>
    </div>
</template>

<script>
  import subjectApi from '@/api/edu/subject.js'
    export default {
        name: "list",
      data() {
        return {
          filterText: '',
          subjectTree: [],
          defaultProps: {
            children: 'nodes',
            label: 'title'
          }
        };
      },
      watch: {
        filterText(val) {
          this.$refs.tree.filter(val);
        }
      },
      created(){
        this.initTree()
      },
      methods: {
        filterNode(value, data) {
          if (!value) return true;
          return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        },
        initTree(){
          subjectApi.getSubjectTree()
            .then(response =>{
            this.subjectTree = response.data.subjectTree;
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
