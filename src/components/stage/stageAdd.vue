<template>
  <el-upload
  ref="upload"
  action="http://49.235.180.218:19999/uploadFile"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :data="{user_id:user_id,repository_id:repository_id}"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传txt/xls文件，且不超过500kb</div>
</el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: [],
        user_id:window.sessionStorage.getItem('user_id'),
        repository_id:this.$route.query.id
      };
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>