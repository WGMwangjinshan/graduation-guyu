<template>
  <div>
    <div>
      <p style="display:inline-block;width:10%">文件名：</p>
      <el-input placeholder="请输入文件名称" v-model="Txtname" style="width:90%"></el-input>
    </div>
    <div>
      <p style="display:inline-block;width:10%;float:left">文件内容：</p>
      <el-input
        type="textarea"
        :rows="20"
        placeholder="请输入文件内容"
        v-model="contentTxt"
        style="width:90%"
      ></el-input>
    </div>
    <el-button type="primary" round style="margin-top:30px" @click="createTxt">创建文件</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentTxt: "",
      Txtname: ""
    };
  },
  methods:{
      createTxt()
      {
          console.log(this.$route.query.id);
          
          let params1 = {
              repository_id:this.$route.query.id,
              user_id:window.sessionStorage.getItem('user_id'),
              name:this.Txtname,
              type:'2',
              content:this.contentTxt
    };
    let params = JSON.stringify(params1);

    this.$http
      .post("http://49.235.180.218:19999/createNewFile", params)
      .then(res => {
        console.log("获取库列表的返回值", res);
        let jsonObj = JSON.stringify(res);
        console.log(jsonObj);
        this.status = eval("(" + jsonObj + ")").data.base.body;
        if (this.status == "success") {
          alert('创建txt文件成功')
          this.Txtname = '';
          this.contentTxt = ''
          this.$store.commit('changeStageIndex_activeName','first')
          this.$store.commit('stageKeyAdd')
        } else {
          alert("新建文件失败");
        }
      });
      }
  }
};
</script>

<style>
</style>