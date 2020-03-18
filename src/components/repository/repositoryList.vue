  <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="owner" label="拥有者" width="180"></el-table-column>
      <el-table-column prop="name" label="库名" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="200"></el-table-column>
      <el-table-column prop="update_time" label="上次编辑时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" size="mini" style="margin-right:10px" @click="intoRepository">进入库</el-button>
          <!-- <el-button type="text" size="small" @click="changeRepository">编辑库</el-button>-->
          <el-popover placement="right" width="400" trigger="click">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

              <el-form-item label="特殊资源">
                <el-radio-group v-model="form.authority">
                  <el-radio v-model="form.authority" label="0">共有仓库</el-radio>
                  <el-radio v-model="form.authority" label="1">私有仓库</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateRepository">立即创建</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
            <el-button type="text" slot="reference" size="mini">编辑库</el-button>
          </el-popover>
          <!-- <el-button type="text" size="mini" style="margin-left:10px">删除库</el-button> -->
          <el-popconfirm title="这是一段内容确定删除吗？">
            <el-button slot="reference" size="mini" type="text" style="margin-left:10px">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

  <script>
export default {
  created() {
      alert('我现在急需要这个id======'+this.$store.state.user_id)
    // console.log();
    
  },

  data() {
    return {
      tableData: [
        {
          id:'1',
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      form: {
        name: "",
        authority: ""
      }
    };
  },
  methods: {
    intoRepository() {
      this.$router.push({
        path: "/stageIndex"
        // name:{StageIndex}
        // query: { id: this.tableData[0].id }
      });
    },
    updateRepository()
    {

    }
  }
};
</script>
