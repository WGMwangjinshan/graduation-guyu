  <template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="文件ID"></el-table-column>
      <el-table-column prop="creator_name" label="拥有者" width="200"></el-table-column>
      <el-table-column prop="create_time" label="创建日期" width="200"></el-table-column>
      <el-table-column prop="update_time" label="上次修改日期" width="200"></el-table-column>
      <el-table-column prop="name" label="文件名" width="180"></el-table-column>
      <!-- <el-table-column prop="address" label="文件类型"></el-table-column> -->
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="changeRow(scope.$index, tableData)"
          >编辑文档</el-button>
          <el-button
            type="text"
            size="small"
            @click.native.prevent="delFile(scope.$index, tableData)"
          >删除文档</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑文档" :visible.sync="contentDialog" width="80%" height="80%" center>
      <el-input
        type="textarea"
        :rows="20"
        placeholder="请输入内容"
        v-model="content_txt"
        v-if="contentType == 'txt'"
      ></el-input>
      <!-- 如果是表格的话 -->
      <!-- <el-table
      :data="content_table"
      style="width: 100%"
      v-if="contentType == 'xls'"
      >
      <template>
        <el-table-column v-for="item in content_table"
        :prop="item.id"
        :label="item.content"
        :key="item.id">
        </el-table-column>
      </template>
      </el-table>-->
      <table border="1" v-if="contentType == 'xls'">
        <!-- <tr v-for="item in content_table">{{item}}</tr> -->
        <tr>
          <td v-for="item in content_table">{{item.line}}</td>
        </tr>

        <tr>
          <td v-for="item in content_table">
            <el-input v-model="item.content"></el-input>
          </td>
        </tr>
      </table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateFile">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

  <script>
export default {
  name: "stageList",
  created() {
    // alert(this.$route.query.id)
    let params1 = {
      repository_id: this.$route.query.id,
      user_id: window.sessionStorage.getItem("user_id")
    };
    let params = JSON.stringify(params1);
    this.$http
      .post("http://49.235.180.218:19999/getFileList", params)
      .then(res => {
        console.log("获取文件列表信息的返回值", res);
        let jsonObj = JSON.stringify(res);
        console.log(jsonObj);
        this.status = eval("(" + jsonObj + ")").data.base.body;
        if (this.status == "success") {
          // alert('获取文件列表成功成功')
          console.log(
            "这个是文件列表" + eval("(" + jsonObj + ")").data.file_list
          );

          this.tableData = eval("(" + jsonObj + ")").data.file_list;
        } else {
          alert("更新库失败");
        }
      });
  },
  data() {
    return {
      tableData: [],
      contentType: "",
      contentDialog: false,
      content_txt: "",
      content_table: [],
      line_len: "",
      row_len: "",
      contentDialog: false,
      file_id:'',
      file_name:''
    };
  },
  methods: {
    updateFile() {
      if (this.contentType == "txt") {
        this.contentDialog = false;
        let params1 = {
          file_id: this.file_id,
          content:this.content_txt,
          user_id:window.sessionStorage.getItem('user_id'),
          name:this.file_name
        };
        let params = JSON.stringify(params1);
        this.$http
          .post("http://49.235.180.218:19999/updateTextContent", params)
          .then(res => {
            let jsonObj = JSON.stringify(res);
            this.status = eval("(" + jsonObj + ")").data.base.body;
            if (this.status == "success") {
              // alert('获取文件列表成功成功')
              console.log(
                '更新txt文件成功'
              );
            } else {
              alert("更新库失败");
            }
          });
      } else if (this.contentType == "xls") {
        this.contentDialog = false;
      }
    },
    delFile(index, rows) {
      console.log(rows[index].id);
      let params1 = {
        file_id: rows[index].id,
        user_id: window.sessionStorage.getItem("user_id")
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/delFile", params)
        .then(res => {
          console.log("删除文件的返回值", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            alert("删除文件成功");
            this.$store.commit("stageKeyAdd");
          } else {
            alert("删除文件失败");
          }
        });
    },
    changeRow(index, row) {
      this.file_id = row[index].id,
      this.file_name = row[index].name

      console.log(window.sessionStorage.getItem("user_id"));
      let params1 = {
        file_id: row[index].id,
        user_id: window.sessionStorage.getItem("user_id")
      };
      let params = JSON.stringify(params1);
      this.$http
        .post("http://49.235.180.218:19999/getFileContent", params)
        .then(res => {
          console.log("获取文件内容信息的返回值", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            // alert("获取文件内容成功");
            this.contentDialog = true;

            if (
              eval("(" + jsonObj + ")").data.content == null &&
              eval("(" + jsonObj + ")").data.table_content != null
            ) {
              this.contentType = "xls";
              console.log(
                "这个是xls文件列表" +
                  eval("(" + jsonObj + ")").data.table_content
              );
              this.content_table = eval(
                "(" + jsonObj + ")"
              ).data.table_content.table_cells;
              this.line_len = eval(
                "(" + jsonObj + ")"
              ).data.table_content.line_len;
              this.row_len = eval(
                "(" + jsonObj + ")"
              ).data.table_content.row_len;
              console.log(this.line_len, this.row_len);
            } else if (
              eval("(" + jsonObj + ")").data.table_content == null &&
              eval("(" + jsonObj + ")").data.content != null
            ) {
              this.contentType = "txt";
              console.log(
                "这个是txt文件列表" + eval("(" + jsonObj + ")").data.content
              );
              this.content_txt = eval("(" + jsonObj + ")").data.content;
            }
          } else {
            alert("更新库失败");
          }
        });
    }
  }
};
</script>
