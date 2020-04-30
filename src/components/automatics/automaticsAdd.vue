<template>
  <div>
    <p>这个是添加</p>
    <!-- trigger的弹出框 -->
    <!-- trigger的弹出框 -->
    <!-- trigger的弹出框 -->
    <!-- trigger的弹出框 -->
    <!-- trigger的弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-card v-for="(item, index) in options1">
        <div v-if="item.key == 'Single'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-select v-model="value11[index]" placeholder="请选择" style="width:80%">
            <el-option v-for="i in item.options" :key="i.id" :label="i.value" :value="i.value"></el-option>
          </el-select>
        </div>
        <div v-else-if="item.key == 'Checkbox'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-select v-model="value12[index]" multiple placeholder="请选择" style="width:80%">
            <el-option v-for="i in item.options" :key="i.id" :label="i.value" :value="i.value"></el-option>
          </el-select>
        </div>
        <div v-else-if="item.key == 'Text'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-input
            style="display:inline-block;width:80%"
            v-model="value13[index]"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div v-else-if="item.key == 'DateTime'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-date-picker
            v-model="value14[index]"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="display:inline-block;width:80%"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div v-else-if="item.key == 'MutiText'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-input
            style="display:inline-block;width:80%"
            type="textarea"
            :rows="2"
            v-model="value15[index]"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="Save1">确 定</el-button>
      </span>

      <!-- action的弹出框 -->
      <!-- action的弹出框 -->
      <!-- action的弹出框 -->
      <!-- action的弹出框 -->
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <el-card v-for="(item, index) in options2">
        <div v-if="item.key == 'Single'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-select
            v-model="value21[index]"
            placeholder="请选择"
            style="width:80%"
            @change="value2Change"
          >
            <el-option v-for="i in item.options" :key="i.id" :label="i.value" :value="i.value"></el-option>
          </el-select>
        </div>
        <div v-else-if="item.key == 'Checkbox'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-select v-model="value22[index]" multiple placeholder="请选择" style="width:80%">
            <el-option v-for="i in item.options" :key="i.id" :label="i.value" :value="i.value"></el-option>
          </el-select>
        </div>
        <div v-else-if="item.key == 'Text'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-input
            style="display:inline-block;width:80%"
            v-model="value23[index]"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div v-else-if="item.key == 'DateTime'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-date-picker
            v-model="value24[index]"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="display:inline-block;width:80%"
            placeholder="选择日期时间"
          ></el-date-picker>
        </div>
        <div v-else-if="item.key == 'MutiText'">
          <p style="display:inline-block;width:20%">{{ item.title }}</p>
          <el-input
            style="display:inline-block;width:80%"
            type="textarea"
            :rows="2"
            v-model="value25[index]"
            placeholder="请输入内容"
          ></el-input>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="Save2">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建流：</span>
        <el-input v-model="flow_defination_name" placeholder="请输入流名称"></el-input>
        <el-button style="float: right; padding: 3px 0" type="text" @click="createFlow">提交创建的流</el-button>
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
                :key="item.item"
                :label="item.action_name"
                :value="item.item"
              ></el-option>
            </el-select>
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
                :key="item.item"
                :label="item.action_name"
                :value="item.item"
              ></el-option>
            </el-select>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      value11: [] /* tirigger单选*/,
      value12: [] /* tirigger多选*/,
      value13: [] /* tirigger文本*/,
      value14: [] /* tirigger时间选择器*/,
      value15: [] /* tirigger多行文本*/,
      value21: [] /* action单选*/,
      value22: [] /* action多选*/,
      value23: [] /* action文本*/,
      value24: [] /* action时间选择器*/,
      value25: [] /* action多行文本*/,
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
      content2: "",
      checkbox1: "",
      checkbox2: ""
    };
  },
  created() {
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
          this.triggerOptions = eval("(" + jsonObj + ")").data.action_list;
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
          this.actionOptions = eval("(" + jsonObj + ")").data.action_list;
        } else {
          alert("获取行为失败");
        }
      });
  },
  methods: {
    triggerChange() {
      this.value11 = [];
      this.value12 = [];
      this.value13 = [];
      this.value14 = [];
      this.value15 = [];
      this.triggerUrl = this.triggerOptions[this.triggerValue].ActionIcon;
      // alert(this.triggerOptions[this.triggerValue].ActionId);
      this.dialogVisible = true;
      let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        action_id: this.triggerOptions[this.triggerValue].action_id
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/getActionDefination", params)
        .then(res => {
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            console.log(
              eval("(" + jsonObj + ")").data.behavior_defination_list
            );
            this.options1 = eval(
              "(" + jsonObj + ")"
            ).data.behavior_defination_list;
            // console.log(
            //   "我是action——ID的值长度==" +
            //     this.options1.length +
            //     "我是action——ID1的值==" +
            //     this.options1[0] +
            //     "我是action——ID的值1的key" +
            //     this.options1[0].key
            // );
          } else {
            alert("获取行为失败");
          }
        });
    },
    Save1() {
      this.dialogVisible = false;
      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].key == "Single") {
          this.value11.push(this.options1[i].value);
        } else if (this.options1[i].key == "Checkbox") {
          this.value12.push(this.options1[i].value);
        } else if (this.options1[i].key == "Text") {
          this.value13.push(this.options1[i].value);
        } else if (this.options1[i].key == "DateTime") {
          this.value14.push(this.options1[i].value);
        } else if (this.options1[i].key == "MutiText") {
          this.value15.push(this.options1[i].value);
        }
      }
    },
    actionChange() {
      this.value21 = [];
      this.value22 = [];
      this.value23 = [];
      this.value24 = [];
      this.value25 = [];
      this.actionUrl = this.actionOptions[this.actionValue].ActionIcon;
      this.dialogVisible1 = true;
      let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        action_id: this.actionOptions[this.actionValue].action_id
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/getActionDefination", params)
        .then(res => {
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            // this.options1 = eval("(" + jsonObj + ")").data.action_list
            console.log(
              eval("(" + jsonObj + ")").data.behavior_defination_list
            );
            this.options2 = eval(
              "(" + jsonObj + ")"
            ).data.behavior_defination_list;
          } else {
            alert("获取行为失败");
          }
        });
    },
    Save2() {
      this.dialogVisible1 = false;
      for (let i = 0; i < this.options2.length; i++) {
        if (this.options2[i].key == "Single") {
          this.value21.push(this.options2[i].value);
        } else if (this.options2[i].key == "Checkbox") {
          this.value22.push(this.options2[i].value);
        } else if (this.options2[i].key == "Text") {
          this.value23.push(this.options2[i].value);
        } else if (this.options2[i].key == "DateTime") {
          this.value24.push(this.options2[i].value);
        } else if (this.options2[i].key == "MutiText") {
          this.value25.push(this.options2[i].value);
        }
      }
    },
    createFlow() {
      let TriggerBehaviorList1 = [];

      for (let i = 0; i < this.options1.length; i++) {
        if (this.options1[i].key == "Single") {
          TriggerBehaviorList1.push({
            title: this.options1[i].title,
            key: this.options1[i].key,
            value: this.value11[i],
            position: this.options1[i].position
          });
        } else if (this.options1[i].key == "Checkbox") {
          for (let l = 0; l < this.value12[i].length; l++) {
            this.checkbox1 = this.checkbox1 + this.value12[i][l] + ",";
          }
          if (this.checkbox1.length > 0) {
            this.checkbox1 = this.checkbox1.substr(
              0,
              this.checkbox1.length - 1
            );
          }
          TriggerBehaviorList1.push({
            title: this.options1[i].title,
            key: this.options1[i].key,
            value: this.checkbox1,
            position: this.options1[i].position
          });
        } else if (this.options1[i].key == "Text") {
          TriggerBehaviorList1.push({
            title: this.options1[i].title,
            key: this.options1[i].key,
            value: this.value13[i],
            position: this.options1[i].position
          });
        } else if (this.options1[i].key == "DateTime") {
          TriggerBehaviorList1.push({
            title: this.options1[i].title,
            key: this.options1[i].key,
            value: this.value14[i],
            position: this.options1[i].position
          });
        } else if (this.options1[i].key == "MutiText") {
          TriggerBehaviorList1.push({
            title: this.options1[i].title,
            key: this.options1[i].key,
            value: this.value15[i],
            position: this.options1[i].position
          });
        }
      }

      let ActionBehaviorList2 = [];
      for (let i = 0; i < this.options2.length; i++) {
        // alert('我还是一个测试，现在都在测试阶段==='+this.options1[i].title+this.options1[i].key+this.options1[i].position);
        if (this.options2[i].key == "Single") {
          ActionBehaviorList2.push({
            title: this.options2[i].title,
            key: this.options2[i].key,
            value: this.value21[i],
            position: this.options2[i].position
          });
        } else if (this.options2[i].key == "Checkbox") {
          for (let l = 0; l < this.value22[i].length; l++) {
            this.checkbox2 = this.checkbox2 + this.value22[i][l] + ",";
          }
          if (this.checkbox2.length > 0) {
            this.checkbox2 = this.checkbox2.substr(
              0,
              this.checkbox2.length - 1
            );
          }
          ActionBehaviorList2.push({
            title: this.options2[i].title,
            key: this.options2[i].key,
            value: this.checkbox2,
            position: this.options2[i].position
          });
        } else if (this.options2[i].key == "Text") {
          ActionBehaviorList2.push({
            title: this.options2[i].title,
            key: this.options2[i].key,
            value: this.value23[i],
            position: this.options2[i].position
          });
        } else if (this.options2[i].key == "DateTime") {
          ActionBehaviorList2.push({
            title: this.options2[i].title,
            key: this.options2[i].key,
            value: this.value24[i],
            position: this.options2[i].position
          });
        } else if (this.options2[i].key == "MutiText") {
          ActionBehaviorList2.push({
            title: this.options2[i].title,
            key: this.options2[i].key,
            value: this.value25[i],
            position: this.options2[i].position
          });
        }
      }
      let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        flow_defination_name: this.flow_defination_name,
        action_list: [
          {
            action_id: this.triggerOptions[this.triggerValue].action_id,
            action_name: this.triggerOptions[this.triggerValue].action_name,
            action_position: "1",
            action_type: "1",
            action_icon: this.triggerOptions[this.triggerValue].action_icon,
            behavior_instance_list: TriggerBehaviorList1
          },
          {
            action_id: this.actionOptions[this.actionValue].action_id,
            action_name: this.actionOptions[this.actionValue].action_name,
            action_position: "2",
            action_type: "2",
            action_icon: this.actionOptions[this.actionValue].action_icon,
            behavior_instance_list: ActionBehaviorList2
          }
        ]
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/createFlowDefination", params)
        .then(res => {
          let jsonObj = JSON.stringify(res);
          console.log(jsonObj);
          this.status = eval("(" + jsonObj + ")").data.base.body;
          if (this.status == "success") {
            alert("创建新的flow成功");
            this.$store.commit("flowKeyAdd");
          } else {
            alert("添加新的flow失败");
          }
        });
    }
  }
};
</script>

<style>
.box-card {
  width: 600px;
  margin: 0 auto;
}
</style>