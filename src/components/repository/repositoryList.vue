  <template>
  <div>
    <el-table :data="tableData" style="width: 100%" :key="this.tableF5">
      <el-table-column prop="id" label="编号" width="200"></el-table-column>
      <el-table-column prop="owner" label="拥有者" width="180"></el-table-column>
      <el-table-column prop="name" label="库名" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="update_time" label="上次编辑时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" size="mini" style="margin-right:10px" @click="intoRepository">进入库</el-button>
          <!-- <el-button type="text" size="small" @click="changeRepository">编辑库</el-button>-->
          <el-popover placement="right" width="400" trigger="click">
            <el-form ref="form" :model="formData" label-width="80px" v-if="formShow = 'true'">
              <el-form-item label="活动名称">
                <el-input v-model="formData.name"></el-input>
              </el-form-item>

              <el-form-item label="特殊资源">
                <el-radio-group v-model="formData.authority">
                  <el-radio v-model="formData.authority" label="0">共有仓库</el-radio>
                  <el-radio v-model="formData.authority" label="1">私有仓库</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateRepository">立即更新</el-button>
                <!-- <el-button @click="handleCancel">取消</el-button> -->
              </el-form-item>
            </el-form>
            <el-button
              type="text"
              slot="reference"
              size="mini"
              @click.native.prevent="changeRow(scope.$index, tableData)"
            >编辑库</el-button>
          </el-popover>
          <!-- <el-button type="text" size="mini" style="margin-left:10px">删除库</el-button> -->
          <!-- <el-popconfirm title="这是一段内容确定删除吗？"> -->
          <el-button
            slot="reference"
            size="mini"
            type="text"
            style="margin-left:10px"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button>
          <!-- </el-popconfirm> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  created() {
    // alert('我现在急需要这个id======'+this.$store.state.user_id)
    // console.log();
    let params1 = {
      user_id: this.$store.state.user_id
    };
    let params = JSON.stringify(params1);

    this.$http
      .post("http://49.235.180.218:19999/getRepositoryList", params)
      .then(res => {
        console.log("获取库列表的返回值", res);
        let jsonObj = JSON.stringify(res);
        console.log(jsonObj);
        this.status = eval("(" + jsonObj + ")").data.base.body;
        if (this.status == "success") {
          this.tableData = eval("(" + jsonObj + ")").data.repository_list;
        } else {
          alert("获取库列表失败");
        }
      });
  },

  data() {
    return {
      tableData: [{}],
      formShow:'true',
      // form: {
      //   name: "",
      //   authority: ""
      // },
      formData:{
        name:'',
        authority:''
      },
      changeId:'',
      tableF5:'1'
    };
  },
  props:["refreshTable"],
  methods: {

    changeRow(index,rows)
    {
          console.log(rows[index].id);
          this.changeId = rows[index].id
          console.log(String(rows[index].authority));
          this.formData.name = rows[index].name;
          this.formData.authority = String(rows[index].authority)
          
    },
    intoRepository() {
      this.$router.push({
        path: "/stageIndex"
        // name:{StageIndex}
        // query: { id: this.tableData[0].id }
      });
    },
    updateRepository() {
      let params1 = {
        repository_id:this.changeId,
        name:this.formData.name,
        authority:this.formData.authority,
        user_id: this.$store.state.user_id
      };
      let params = JSON.stringify(params1);
      this.$http
        .post("http://49.235.180.218:19999/updateRepository", params)
        .then(res => {
          console.log("更改库信息的返回值", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            alert('更新库成功')
            this.$emit('refreshTableList',Math.random()*100)
          } else {
            alert("更新库失败");
          }
        });
    },
    deleteRow(index, rows) {
      // rows.splice(index, 1);
      console.log(rows[index].id);
      console.log(this.$store.state.user_id);
      let params1 = {
        repository_id:rows[index].id,
        user_id: this.$store.state.user_id
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/delRepository", params)
        .then(res => {
          console.log("删除库列表的返回值", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            alert('删除库成功')
            this.$emit('refreshTableList',Math.random()*1000)
          } else {
            alert("删除库失败");
          }
        });

           
    }
  }
};
</script>
