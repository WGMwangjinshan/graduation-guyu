<template>
  <div>
    <router-link :to="{name:'Personal',query:{id:this.$store.state.account}}" @click="Personal">
      <el-avatar style="float:right" icon="el-icon-user-solid"></el-avatar>
    </router-link>
    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="文件管理">

        <stage-index></stage-index>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import stageIndex from '../components/stage/stageIndex'
export default {
  components:{
    stageIndex
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  created() {
    // alert('我是这个界面的唯一标示'+this.$route.query.id)
    console.log("我是这个界面的唯一标示" + this.$route.query.id);
    console.log("我是vuex内的account" + this.$store.state.account);
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
