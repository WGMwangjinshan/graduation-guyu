<template>
  <div>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="创建txt文件" name="first">
      <create-txt></create-txt>
    </el-tab-pane>
    <el-tab-pane label="创建xls文件" name="second">
      <create-xls></create-xls>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import createTxt from './createFile/createTxt'
import createXls from './createFile/createXls'
  export default {
    components:{
        createTxt,
        createXls
    },
    data() {
      return {
        activeName:'first'
      };
    },
    methods: {

    }
  }
</script>