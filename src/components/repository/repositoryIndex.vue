<template>
  <div>
    <!-- <el-button style="float:left" @click="addRepository" >添加库</el-button> -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="添加库" name="first">
        <repository-add></repository-add>
      </el-tab-pane>
      <el-tab-pane label="库列表" name="second">
        <repository-list></repository-list>
      </el-tab-pane>
      <!-- <el-tab-pane label="添加文件" name="second">
      <stage-add></stage-add>
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
import repositoryList from "./repositoryList";
import repositoryAdd from "./repositoryAdd";

// import stageAdd from "./stageAdd";

export default {
  components: {
    // stageList,
    repositoryList,
    repositoryAdd
    // stageAdd
  },
  name: "stageIndex",

  data() {
    return {
      activeName: "second",
      addNum: "0"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addRepository() {
      this.addNum = "1";
    }
  }
};
</script>

<style>
</style>