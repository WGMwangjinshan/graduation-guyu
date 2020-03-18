<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="活动名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.authority">
        <el-radio v-model="form.authority" label="0">共有仓库</el-radio>
        <el-radio v-model="form.authority" label="1">私有仓库</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        authority: "0"
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      let params1 = {
        name: this.form.name,
        authority: this.form.authority
      };
      let params = JSON.stringify(params1);

      this.$http.post("http://49.235.180.218:19999/createRepository", params).then(res => {
        console.log("res=>", res);
        let jsonObj = JSON.stringify(res);
        console.log(jsonObj);
        this.status = eval("(" + jsonObj + ")").data.base.body;
        if (this.status == "success") {
          this.$router.push({
            path: "/home",
            query: { id: this.$store.state.user_id }
          });
        } else {
          alert("添加新的库失败");
        }
      });
    }
  }
};
</script>