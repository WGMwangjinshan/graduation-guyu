<template>
  <div class="about">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登陆呀宝贝</span>
      </div>
      <div class="input">
        <p style="display:inline-block;width:20%">用户名：</p>
        <el-input v-model="account" placeholder="请输入账号" style="width:80%"></el-input>
        <p style="display:inline-block;width:20%">密码：</p>
        <el-input v-model="password" placeholder="请输入密码" show-password style="width:80%"></el-input>
      </div>
      <div class="LogOrSign">
        <el-button type="primary" style="margin-left:50px" @click="Login">登陆</el-button>
        <router-link to="/sign">
          <el-button type="warning" style="margin-left:50px" @click="Sign">还没账号？？？快给爷注册一个</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: "",
      password: "",
      status: ""
    };
  },
  created() {
    // this.$axios({
    //   methods:'post',
    //   url:'http://49.235.180.218:8080/login',
    //   data()
    //   {
    //   }
    // }).then((response) =>{
    //   console.log(response);
    // })
    // function post () {
    //           //请求参数、url、创建XMLHttpRequest
    //       　　let data = 'account=1234567&age=123',
    //       　　　　url = 'http://49.235.180.218:8080/login',
    //       　　　　xhr = new XMLHttpRequest();
    //     console.log('lalalalal');
    //       　　xhr.open('post', url);
    //           //设置header
    //       　　xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //       　　xhr.send(data);
    //       　　xhr.onreadystatechange = function () {
    //       　　　　if (xhr.readyState === 4 && ( xhr.status === 200 || xhr.status === 304 )){
    //       　　　　　　console.log(xhr.responseText);
    //       　　　　}
    //       　　}
    //       }
    //       post()
  },
  methods: {
    Login: function() {
      let params1 = {
        user_base: {
          account: this.account,
          password: this.password
        }
      };
      let params = JSON.stringify(params1);

      this.$http.post("http://49.235.180.218:19999/login", params).then(res => {
        console.log("res=>", res);
        let jsonObj = JSON.stringify(res);
        console.log(jsonObj);
        this.status = eval("(" + jsonObj + ")").data.base.body;
        if (this.status == "success") {
          console.log("我是新的数据" + eval("(" + jsonObj + ")").data);
          // this.$router.push('/home')
          // this.$store.state.account = this.account
          let storage = window.sessionStorage;
          this.$store.commit('changeAccount',this.account)
          storage.setItem('account',this.account)
          this.$store.commit('changePassword',this.password)
          storage.setItem('password',this.password)
          this.$store.commit('makeUserId',eval("(" + jsonObj + ")").data.user_id)
          storage.setItem('user_id',eval("(" + jsonObj + ")").data.user_id)
          this.$store.commit('makeImageId',eval("(" + jsonObj + ")").data.image_id)
          storage.setItem('image_id',eval("(" + jsonObj + ")").data.image_id)
          // alert(this.$store.state.image_id)
          this.$router.push({path:'/home',query:{id:this.$store.state.user_id}})
        }
        else{
          // alert(this.$store.state.account)
          alert('少年你的盗号技术不行啊')
        }
      });
    },
    Sign: function() {
      console.log("sign  up");
    }
  }
};
</script>
<style  scoped>
.box-card {
  width: 480px;
  margin: 0 auto;
}
.input {
  margin-bottom: 20px;
}
.LogOrSign {
  margin: 20px 0px;
}
</style>