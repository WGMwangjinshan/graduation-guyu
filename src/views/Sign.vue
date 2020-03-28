<template>
  <el-card style="width:80%;margin:0 auto">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://49.235.180.218:19999/getAvatar"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getNowTime } from "../utils/index.js";

export default {
  data() {
    return {
      form: {
        account: "",
        user_name: "",
        password: "",
        create_time: ""
      },
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onSubmit() {
      console.log(getNowTime());
      let params3 = {
        account: this.form.account
      };
      let params4 = JSON.stringify(params3);
      console.log("想要注册的账号时" + params4);

      this.$http
        .post("http://49.235.180.218:19999/certainAccount", params4)
        .then(res => {
          console.log("res=>", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            // console.log("现在这个账号可以注册" + this.status);
            alert("现在这个账号可以使用");
            let params1 = {
              user_base: {
                account: this.form.account,
                password: this.form.password
              },
              user_name: this.form.user_name
            };
            let params = JSON.stringify(params1);
            console.log(params);

            this.$http
              .post("http://49.235.180.218:19999/register", params)
              .then(res => {
                console.log("res=>", res);
                let jsonObj = JSON.stringify(res);
                console.log(jsonObj);
                this.status = eval("(" + jsonObj + ")").data.base.body;
                if (this.status == "success") {
                  console.log("猜猜我是谁" + this.status);
                  this.$router.push("/login");
                }
              });
          } else {
            alert("现在这个账号有人用了");
            (this.form.account = ""),
              (this.form.user_name = ""),
              (this.form.password = "");
          }
        });

      let params1 = {
        user_base: {
          account: this.form.account,
          password: this.form.password
        },
        user_name: this.form.user_name
      };
      let params = JSON.stringify(params1);
      console.log(params);

      this.$http
        .post("http://49.235.180.218:19999/register", params)
        .then(res => {
          console.log("res=>", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            console.log("猜猜我是谁" + this.status);
            this.$router.push("/login");
          }
        });
      //
    },
    AddAvatar() {
      console.log("AddAvator");
    }
  }
};
</script>
<style  scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>