
<template>
  <div>
    
    <div style="width:1420px; height:650px; overflow:scroll;">
      <table rules="all" style="width=“100%” text-align:center" @click="contentChange($event)">
        <tr v-for="item in tableRow" >
          <td v-for="item in tableLen"  >
              
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  created() {},
  data() { 
    return {
      Xlsname: "",
      tableRow: 28,
      tableLen: 11,
      txt: ""
    };
  },
  methods: {
    contentChange(e){
      console.log(e);
      
    }
  }
};
</script>

<style scoped>
td{
width:158px;
}
</style>