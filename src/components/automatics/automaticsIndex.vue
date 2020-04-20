<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :key="$store.state.flowKey">
      <el-tab-pane label="自动化流程列表" name="first">
        <automatics-list></automatics-list>
      </el-tab-pane>
      <el-tab-pane label="创建自动化流程" name="second">
        <automatics-add></automatics-add>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import automaticsList from "./automaticsList";
import automaticsAdd from "./automaticsAdd";

export default {
  components: {
    automaticsList,
    automaticsAdd
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>

<style>
</style>