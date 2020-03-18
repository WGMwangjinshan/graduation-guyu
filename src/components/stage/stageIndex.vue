<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="文件列表" name="first">
      <stage-list></stage-list>
    </el-tab-pane>
    <el-tab-pane label="添加文件" name="second">
      <stage-add></stage-add>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import stageList from "./stageList";
import stageAdd from "./stageAdd";

export default {
  created()
  {
    console.log('我是文件列表的vue文件');
    
  },
  components: {
    stageList,
    stageAdd
  },
  name: "stageIndex",

  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style>
</style>