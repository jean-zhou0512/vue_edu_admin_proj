<template>
    <div class="api-container">
        <el-table
          :data="list"
          style="width: 100%"
          border
          fit
          highlight-current-row
          :row-class-name="tableRowClassName">
          <el-table-column
            label="序号"
            width="70"
            align="center">
            <template slot-scope="scope">
              {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="100"
            align="center">
          </el-table-column>

          <el-table-column
            prop="level"
            label="头衔"
            width="80"
            align="center">
          </el-table-column>

          <el-table-column
            prop="career"
            label="资历"
            >
          </el-table-column>

          <el-table-column
            prop="gmtCreate"
            label="添加时间"
            width="200"
            align="center">
          </el-table-column>

          <el-table-column
            prop="name"
            label="排序"
            width="60"
            align="center">
          </el-table-column>

          <el-table-column
            label="操作"

            align="center">

            <template slot-scope="scope">
              <router-link to="/login">
                <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
              </router-link>

              <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
  import teacher from '@/api/edu/teacher';
    export default {
        name: "TeacherList",
        data(){
          return{
            currentPage:1,//当前页
            pageSize:10,//一页大小
            total:0,//总页数
            list:null,//返回数据
            teacherQuery:{},//查询条件
          }
        },
        created(){
            this.getList()
        },
        methods:{
          getList(){
              teacher.getTeacherPageList(this.currentPage,this.pageSize,this.teacherQuery)
              .then(response => {
                console.log(response)
                this.list = response.data.eduTeacherList
                this.total = response.data.total
              })
              .catch(error =>{
                console.log(error)
              })
          },
          tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
              return 'warning-row';
            } else if (rowIndex === 3) {
              return 'success-row';
            }
            return '';
          }
        }
    }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
