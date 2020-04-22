<template>
  <div>
    <p>这个是列表</p>
    <el-table :data="flowList" style="width: 100%" v-if="this.showWho == 0">
      <el-table-column prop="flow_defination_id" label="ID" width="380"></el-table-column>
      <el-table-column prop="flow_defination_name" label="流名称" width="300"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            style="margin-right:10px"
            @click.native.prevent="intoFlow(scope.$index, flowList)"
          >进入流</el-button>

          <el-button
            slot="reference"
            size="mini"
            type="text"
            style="margin-left:10px"
            @click.native.prevent="deleteRow(scope.$index, flowList)"
          >删除流</el-button>
          <!-- </el-popconfirm> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 进入库的列表 -->
    <!-- 进入库的列表 -->

    <!-- 进入库的列表 -->
    <!-- 进入库的列表 -->
    <!-- 进入库的列表 -->

    <div v-else-if="this.showWho == 1">
      <el-button @click="backList">返回列表</el-button>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建流：</span>
          <el-input v-model="flow_defination_name" placeholder="请输入流名称"></el-input>
          <el-button style="float: right; padding: 3px 0" type="text" @click="createFlow">提交更新的流</el-button>
        </div>
        <div>
          <!-- Trigger触发者 -->
          <el-card style="margin-bottom:30px">
            <div slot="header" class="clearfix">
              <span>Trigger</span>
            </div>
            <div>
              <el-image style="width: 20px; height: 20px;margin-right:20px" :src="triggerUrl"></el-image>

              <el-select v-model="triggerValue" placeholder="请选择" @change="triggerChange">
                <el-option
                  v-for="item in triggerOptions"
                  :key="item.Item"
                  :label="item.ActionName"
                  :value="item.Item"
                ></el-option>
              </el-select>
              <el-card title="提示" width="30%">
                <el-card>
                  <p style="display:inline-block;width:20%">名称：</p>
                  <el-input style="width:80%"></el-input>
                  <p style="display:inline-block;width:20%">组件属性：</p>
                  <el-select
                    v-model="value1"
                    placeholder="请选择"
                    style="width:80%"
                    @change="value1Change"
                  >
                    <el-option
                      v-for="item in options1"
                      :key="item.title"
                      :title="item.position"
                      :value="item.title"
                    ></el-option>
                  </el-select>
                  <p style="display:inline-block;width:20%">选项：</p>
                  <div style="width:80%">
                    <el-radio-group v-if="this.key1 == 'Single'" v-model="radio">
                      <el-radio label="A">A</el-radio>
                      <el-radio label="B">B</el-radio>
                      <el-radio label="C">C</el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-else-if="this.key1 == 'Checkbox'" v-model="checkList">
                      <el-checkbox label="A">A</el-checkbox>
                      <el-checkbox label="B">B</el-checkbox>
                      <el-checkbox label="C">C</el-checkbox>
                    </el-checkbox-group>
                    <el-input v-model="input" placeholder="请输入内容" v-else-if="this.key1 == 'Text'"></el-input>
                    <el-date-picker
                      v-model="datetime"
                      type="datetime"
                      placeholder="选择日期时间"
                      v-else-if="this.key1 == 'DateTime'"
                    ></el-date-picker>
                    <el-input
                      v-model="textarea"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-else-if="this.key1 == 'MutiText'"
                    ></el-input>
                  </div>
                </el-card>
                <span slot="footer" class="dialog-footer">
                  <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                  <el-button type="primary" @click="Save1">确 定</el-button>
                </span>
              </el-card>
            </div>
          </el-card>
          <!-- Action反应者 -->
          <el-card>
            <div slot="header" class="clearfix">
              <span>Action</span>
            </div>
            <div>
              <el-image style="width: 20px; height: 20px;margin-right:20px" :src="actionUrl"></el-image>

              <el-select v-model="actionValue" placeholder="请选择" @change="actionChange">
                <el-option
                  v-for="item in actionOptions"
                  :key="item.Item"
                  :label="item.ActionName"
                  :value="item.Item"
                ></el-option>
              </el-select>
              <el-card title="提示" width="30%">
                <el-card>
                  <p style="display:inline-block;width:20%">名称：</p>
                  <el-input style="width:80%"></el-input>
                  <p style="display:inline-block;width:20%">组件属性：</p>
                  <el-select
                    v-model="value2"
                    placeholder="请选择"
                    style="width:80%"
                    @change="value2Change"
                  >
                    <el-option
                      v-for="item in options2"
                      :key="item.title"
                      :title="item.position"
                      :value="item.title"
                    ></el-option>
                  </el-select>
                  <p style="display:inline-block;width:20%">选项：</p>
                  <div style="width:80%">
                    <el-radio-group v-if="this.key2 == 'Single'" v-model="radio2">
                      <el-radio label="A">A</el-radio>
                      <el-radio label="B">B</el-radio>
                      <el-radio label="C">C</el-radio>
                    </el-radio-group>
                    <el-checkbox-group v-else-if="this.key2 == 'Checkbox'" v-model="checkList2">
                      <el-checkbox label="A">A</el-checkbox>
                      <el-checkbox label="B">B</el-checkbox>
                      <el-checkbox label="C">C</el-checkbox>
                    </el-checkbox-group>
                    <el-input v-model="input2" placeholder="请输入内容" v-else-if="this.key2 == 'Text'"></el-input>
                    <el-date-picker
                      v-model="datetime2"
                      type="datetime"
                      placeholder="选择日期时间"
                      v-else-if="this.key2 == 'DateTime'"
                    ></el-date-picker>
                    <el-input
                      v-model="textarea2"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-else-if="this.key2 == 'MutiText'"
                    ></el-input>
                  </div>
                </el-card>
                <span slot="footer" class="dialog-footer">
                  <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                  <el-button type="primary" @click="Save2">确 定</el-button>
                </span>
              </el-card>
            </div>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
    let params1 = {
      user_id: window.sessionStorage.getItem("user_id")
    };
    let params = JSON.stringify(params1);

    this.$http
      .post("http://49.235.180.218:19999/getFlowDefinationList", params)
      .then(res => {
        let jsonObj = JSON.stringify(res);
        console.log(jsonObj);
        this.status = eval("(" + jsonObj + ")").data.base.body;
        if (this.status == "success") {
          this.flowList = eval("(" + jsonObj + ")").data.flow_defination_list;
        } else {
          alert("获取行为失败");
        }
      });
  },
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      flowList: [],
      showWho: 0,
      dialogVisible: false,
      dialogVisible1: false,
      flow_defination_name: "",
      activeName: "first",
      triggerOptions: [],
      triggerValue: "",
      triggerUrl: "",
      actionOptions: [],
      actionValue: "",
      actionUrl: "",
      value1: "单选",
      value2: "单选",
      options1: [],
      options2: [],
      radio: "A",
      checkList: [],
      input: "",
      textarea: "",
      datetime: "",
      key1: "Single",
      radio2: "A",
      checkList2: [],
      input2: "",
      textarea2: "",
      datetime2: "",
      key2: "Single",
      position1: "0",
      content1: "",
      content2: ""
    };
  },
  methods: {
    backList() {
      this.showWho = 0;
      this.$store.commit("flowKeyAdd");
    },
    deleteRow(index, rows) {
      // rows.splice(index, 1);
      console.log("adasdasd" + rows[index].flow_defination_id);
      console.log("adasdasd" + index);
      // console.log(this.$store.state.user_id);
      let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        flow_defination_id: rows[index].flow_defination_id
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/deleteFlowDeination", params)
        .then(res => {
          // console.log("删除库列表的返回值", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            alert("删除流成功");
            this.$store.commit("flowKeyAdd");
            // this.$emit('refreshTableList',Math.random()*1000)
          } else {
            alert("删除流失败");
          }
        });
    },
    triggerChange() {
      alert(this.triggerValue);
      this.dialogVisible = true;
    },
    actionChange() {
      alert(this.triggerValue);
      this.dialogVisible1 = true;
    },
    intoFlow(index, rows) {
      let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        flow_defination_id: rows[index].flow_defination_id
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/getFlowDefinationDetail", params)
        .then(res => {
          // console.log("删除库列表的返回值", res);
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            let params1 = {
              user_id: window.sessionStorage.getItem("user_id"),
              action_type: "1"
            };
            let params = JSON.stringify(params1);

            this.$http
              .post("http://49.235.180.218:19999/getActionList", params)
              .then(res => {
                let jsonObj = JSON.stringify(res);
                console.log(jsonObj);
                this.status = eval("(" + jsonObj + ")").data.base.body;
                if (this.status == "success") {
                  this.triggerOptions = eval(
                    "(" + jsonObj + ")"
                  ).data.action_list;


                } else {
                  alert("获取行为失败");
                }
              });

            let params3 = {
              user_id: window.sessionStorage.getItem("user_id"),
              action_type: "2"
            };
            let params4 = JSON.stringify(params3);

            this.$http
              .post("http://49.235.180.218:19999/getActionList", params4)
              .then(res => {
                let jsonObj = JSON.stringify(res);
                console.log(jsonObj);
                this.status = eval("(" + jsonObj + ")").data.base.body;
                if (this.status == "success") {
                  this.actionOptions = eval(
                    "(" + jsonObj + ")"
                  ).data.action_list;
                } else {
                  alert("获取行为失败");
                }
              });
            let oldData = eval("(" + jsonObj + ")").data.action_list;
            this.showWho = 1;
            this.flow_defination_name = rows[index].flow_defination_name;
            this.triggerUrl = oldData[0].action_icon;
            this.triggerValue = (oldData[0].action_position - 1).toString();
            //  alert(this.triggerOptions)
             console.log('asdasdasdasdasdadasd=========='+this.triggerOptions);
            
            this.options1 = this.$store.state.options1
            this.actionUrl = oldData[1].action_icon;
            this.actionValue = (oldData[1].action_position - 1).toString();
            this.options2 = this.$store.state.options2
          } else {
            alert("删除流失败");
          }
        });
    }
  }
};
</script>

<style>
</style>