<template>
    <div class="app-container">
      <el-form :inline="true" :model="teacherQuery" ref="teacherQuery" class="demo-form-inline">
        <el-form-item label="讲师名" prop="name">
          <el-input v-model="teacherQuery.name" placeholder="讲师名"></el-input>
        </el-form-item>
        <el-form-item label="讲师头衔" prop="level">
          <el-select v-model="teacherQuery.level" placeholder="讲师头衔">
            <el-option v-for="teacherTitle in teacherTitleList" :label="teacherTitle.dictValueName" :value="teacherTitle.dictValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-form-item prop="beginTime" type="datetime">
              <el-date-picker type="date" placeholder="选择开始时间"
                v-model="teacherQuery.beginTime" style="width: 100%;"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="endTime" type="datetime">
              <el-date-picker placeholder="选择结束时间"
                v-model="teacherQuery.endTime" style="width: 100%;"
                value-format="yyyy-MM-dd hh:mm:ss"
                default-time="00:00:00"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button @click="resetForm('teacherQuery')">清除</el-button>
        </el-form-item>
      </el-form>

        <el-table
          :data="list"
          style="width: 100%"
          border
          fit
          highlight-current-row
          :row-class-name="tableRowClassName"
          v-loading="loading"
          element-loading-text="加载中...">
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
            prop="levelName"
            label="头衔"
            width="100"
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
                  &nbsp;&nbsp;
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTeacher(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      <el-pagination v-if="list&&list.length > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
  import teacher from '@/api/edu/teacher'
  import dict from '@/api/dict/dict'
    export default {
        name: "TeacherList",
        data(){
          return{
            currentPage:1,//当前页
            pageSize:10,//一页大小
            total:0,//总页数
            list:null,//返回数据
            teacherQuery:{},//查询条件
            loading:true,
            teacherTitleList:''
          }
        },
        created(){
          this.getList()
          this.initData();
        },
        methods:{
          getList(){
              teacher.getTeacherPageList(this.currentPage,this.pageSize,this.teacherQuery)
              .then(response => {
                this.list = response.data.mEduTeacherList
                this.total = response.data.total
                this.loading=false
              })
          },
          tableRowClassName({row, rowIndex}) {
            if (rowIndex %2 == 0) {
              return 'warning-row';
            } else {
              return 'success-row';
            }
            return '';
          },
          handleSizeChange(val){
            this.pageSize = val
            this.getList()
          },
          handleCurrentChange(val){
            this.currentPage = val;
            this.getList();
          },
          query() {
            this.currentPage=1
            this.getList();
          },
          initData(){
            dict.qryDictListByType(dict.dictTypes.TEACHER_TITL)
              .then(response => {
                this.teacherTitleList = response.data.dictList
            })
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          deleteTeacher(id){
            this.$confirm('确认删除该讲师?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              teacher.deleteTeacherById(id).then(response => {
                this.getList()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              })
            }).catch(() => {
            })
          }
        }
    }
</script>

<style  >
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .el-pagination {
    text-align: right;
  }
</style>
