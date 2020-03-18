<template>
  <div>
    <router-link :to="{name:'Personal',query:{id:this.$store.state.user_id}}" @click="Personal">
      <el-avatar style="float:right" icon="el-icon-user-solid"></el-avatar>
    </router-link>
    <el-tabs tab-position="left" style="height: 100%;">
      <el-tab-pane label="仓库管理">
        <repository-index style="height:1800px"></repository-index>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
      
  </div>
</template>
<script>
import repositoryIndex from '../components/repository/repositoryIndex'
export default {
  components:{
    repositoryIndex
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  created() {
    console.log("我是vuex内的account" + this.$store.state.user_id);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    Personal() {
      alert("lalallalalalala");
      console.log("alalalla");
    }
  }
};
</script>
<style scoped>
  #nav{
    margin: 0;
    padding: 0;
  }
</style>
