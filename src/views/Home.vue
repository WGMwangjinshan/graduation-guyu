<template>
  <div>
    <router-link :to="{name:'Personal',query:{id:this.$store.state.user_id}}" @click="Personal">
      <el-avatar style="float:right" icon="el-icon-user-solid" :src="url" fit="scale-down"></el-avatar>
    </router-link>
    <el-tabs tab-position="left" style="height: 100%;">
      <el-tab-pane label="仓库管理">
        <repository-index style="height:1800px"></repository-index>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <automatics-index style="height:1800px"></automatics-index>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import repositoryIndex from "../components/repository/repositoryIndex";
import automaticsIndex from "../components/automatics/automaticsIndex"
export default {
  components: {
    repositoryIndex,
    automaticsIndex
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      url: ""
    };
  },
  created() {
    this.$store.state.user_id = this.$route.query.id;
    console.log("我是vuex内的account" + this.$store.state.user_id);
    console.log(
      "我是vuex内的imageid" + window.sessionStorage.getItem("image_id")
    );
    let params1 = {
      image_id:window.sessionStorage.getItem("image_id")
      };
      let params = JSON.stringify(params1);
    this.$http
      .post("http://49.235.180.218:19999/getAvatar", params)
      .then(res => {
        let jsonObj = JSON.stringify(res);
        // this.status = eval("(" + jsonObj + ")").data.base.body;
          console.log('图片信息是这个'+eval("(" + jsonObj + ")"));
          this.url = 'http://49.235.180.218:50002/img/'+window.sessionStorage.getItem("image_id")+'.png'
          });
         
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    Personal() {
      // alert("lalallalalalala");
      console.log("alalalla");
    }
  }
};
</script>
<style scoped>
#nav {
  margin: 0;
  padding: 0;
}
</style>
