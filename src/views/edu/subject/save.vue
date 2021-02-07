<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="downLoadUrl">点击下载模版</a>
        </el-tag>
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="OSS_PATH +'/excel/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB%E5%88%97%E8%A1%A8%E6%A8%A1%E6%9D%BF.xls'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {ERR_OK} from '@/utils/config'
    export default {
        name: "save",
      data() {
        return {
          importBtnDisabled:false,
          loading:false,
          downLoadUrl:'http://localhost:8001/static/excel/subjectImport.xlsx',
          uploadUrl:process.env.VUE_APP_BASE_API+'/eduservice/subject/addSubject',
        };
      },
      methods: {
        submitUpload() {
          if(this.$refs.upload.uploadFiles.length <= 0){
            this.$message({
              type: 'error',
              message: '请先选择文件'
            })
          }
          this.$refs.upload.submit();
        },
        fileUploadSuccess(file, fileList) {
          if(fileList.response.code == ERR_OK){
            this.loading = false
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
            this.$router.push({path:'/subject/list'})
          }else{
            this.$message({
              type: 'error',
              message: '上传失败!'
            })
          }

        },
        fileUploadError(file) {
          this.$message({
            type: 'success',
            message: '上传失败!'
          })
        }
      }
    }
</script>

<style scoped>

</style>
