<template>
  <el-tabs v-model="$store.state.stageIndex_activeName" type="card" @tab-click="handleClick" :key="$store.state.stageKey">
    <el-tab-pane label="文件列表" name="first">
      <stage-list></stage-list>
    </el-tab-pane>
    <el-tab-pane label="添加文件" name="second">
      <stage-add></stage-add>
    </el-tab-pane>
    <el-tab-pane label="创建文件" name="third">
        <stage-create></stage-create>
    </el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import stageList from "./stageList";
import stageAdd from "./stageAdd";
import stageCreate from './stageCreate'

export default {
  created()
  {
    console.log('我是文件列表的vue文件');
    
  },
  components: {
    stageList,
    stageAdd,
    stageCreate
  },
  name: "stageIndex",

  data() {
    return {
      // activeName: "first"
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