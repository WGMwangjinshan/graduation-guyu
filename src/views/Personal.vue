<template>
  <el-card style="width:80%;margin:0 auto">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="头像">
        <el-avatar icon="el-icon-user-solid" @click="AddAvatar">
          <el-button>llll</el-button>
        </el-avatar>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.user_name" :disabled="canChange == 1"></el-input>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.account" :disabled="canChange == 1"></el-input>
      </el-form-item>
      <el-form-item label="原密码" v-if="canChange == 0">
        <el-input v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新密码" v-if="canChange == 0">
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item v-if="buttonTap == 1">
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button @click="cancelChange">取消</el-button>
      </el-form-item>
      <el-form-item v-else>
        <el-button @click="showChange">进行修改</el-button>
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
        oldPassword: "",
        newPassword: "",
        create_time: ""
      },
      buttonTap: "0",
      canChange: "1",
      status: "",
      status1: ""
    };
  },
  created() {
    console.log("现在的密码是" + this.$store.state.oldPassword);

    let params1 = {
      account: this.$route.query.id
    };
    let params = JSON.stringify(params1);
    this.$http
      .post("http://49.235.180.218:19999/loadUserMessage", params)
      .then(res => {
        console.log("res=>", res);
        let jsonObj = JSON.stringify(res);
        console.log(jsonObj);
        this.status = eval("(" + jsonObj + ")").data.base.body;
        if (this.status == "success") {
          console.log("获取个人信息成功" + this.status);
          this.form.account = eval("(" + jsonObj + ")").data.account;
          this.form.user_name = eval("(" + jsonObj + ")").data.user_name;
        }
      });
  },
  methods: {
    //提交修改信息
    onSubmit() {
      console.log(getNowTime());
      //

      let params1 = {
        account: this.form.account,
        user_name: this.form.user_name,
        password: this.form.newPassword
      };
      let params = JSON.stringify(params1);
      console.log(params);
      if (this.form.oldPassword == this.$store.state.oldPassword) {
        console.log("this is a test");

        this.$http
          .post("http://49.235.180.218:19999/updateUserMessage", params)
          .then(res => {
            console.log("res=>", res);
            let jsonObj = JSON.stringify(res);
            console.log(jsonObj);
            this.status1 = eval("(" + jsonObj + ")").data.base.body;
            if (this.status1 == "success") {
              this.$store.commit("changePassword", this.newPassword);
              console.log("提交更新信息成功" + this.status1);
              alert("提交更新信息成功，即将进入登陆界面重新登陆");
              this.$router.push({
                path: "/login"
              });
            }
          });
      } else {
        alert("你根本不知道原来的密码啊？？？？？？小伙子");
        (this.form.oldPassword = ""), (this.form.newPassword = "");
      }

      //
    },
    //控制信息可否修改
    showChange() {
      this.buttonTap = 1;
      this.canChange = 0;
    },
    cancelChange() {
      this.buttonTap = 0;
      this.canChange = 1;
    },
    AddAvatar() {
      console.log("AddAvator");
    }
  }
};
</script>