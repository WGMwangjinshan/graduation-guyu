<template>
  <div>
    <p>这个是添加</p>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-card>
        <p style="display:inline-block;width:20%">名称：</p>
        <el-input style="width:80%"></el-input>
        <p style="display:inline-block;width:20%">组件属性：</p>
        <el-select v-model="value1" placeholder="请选择" style="width:80%" @change="value1Change">
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
          <el-date-picker v-model="datetime" type="datetime" placeholder="选择日期时间" v-else-if="this.key1 == 'DateTime'"></el-date-picker>
          <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" v-else-if="this.key1 == 'MutiText'"></el-input>
        </div>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="Save1">确 定</el-button>
      </span>
    </el-dialog>

        <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
      <el-card>
        <p style="display:inline-block;width:20%">名称：</p>
        <el-input style="width:80%"></el-input>
        <p style="display:inline-block;width:20%">组件属性：</p>
        <el-select v-model="value2" placeholder="请选择" style="width:80%" @change="value2Change">
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
          <el-date-picker v-model="datetime2" type="datetime" placeholder="选择日期时间" v-else-if="this.key2 == 'DateTime'"></el-date-picker>
          <el-input v-model="textarea2" type="textarea" :rows="2" placeholder="请输入内容" v-else-if="this.key2 == 'MutiText'"></el-input>
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
                :key="item.Item"
                :label="item.ActionName"
                :value="item.Item"
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
                :key="item.Item"
                :label="item.ActionName"
                :value="item.Item"
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
      dialogVisible1:false,
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
      radio: 'A',
      checkList: [],
      input: "",
      textarea: "",
      datetime: "",
      key1:'Single',
      radio2: 'A',
      checkList2: [],
      input2: "",
      textarea2: "",
      datetime2: "",
      key2:'Single',
      position1:'0',
      content1:'',
      content2:''
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
      alert(this.triggerOptions[this.triggerValue].ActionName)
      this.triggerUrl = this.triggerOptions[this.triggerValue].ActionIcon;
      // alert(this.triggerOptions[this.triggerValue].ActionId);
      this.dialogVisible = true;
      let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        action_id: this.triggerOptions[this.triggerValue].ActionId
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
            this.$store.commit('addOptions1',eval(
              "(" + jsonObj + ")"
            ).data.behavior_defination_list)
          } else {
            alert("获取行为失败");
          }
        });
    },
    actionChange() {
      this.actionUrl = this.actionOptions[this.actionValue].ActionIcon;
      this.dialogVisible1 = true;
       let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        action_id: this.actionOptions[this.actionValue].ActionId
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
            this.$store.commit('addOptions2',eval(
              "(" + jsonObj + ")"
            ).data.behavior_defination_list)
          } else {
            alert("获取行为失败");
          }
        });
    },
    value1Change() {
      // alert(this.radio);
      if(this.value1 == '单选')
      {
        this.key1 = 'Single'
        this.position1 = '0'
      }
      else if(this.value1 == '多选')
      {
          this.key1 ='Checkbox'
        this.position1 = '1'

      }
      else if(this.value1 == '文本')
      {
          this.key1 ='Text'
        this.position1 = '2'

      }
      else if(this.value1 == '时间选择器')
      {
          this.key1 ='DateTime'
        this.position1 = '3'

      }
      else if(this.value1 == '多行文本')
      {
          this.key1 ='MutiText'
        this.position1 = '4'

      }
    },
    Save1()
    {
      if(this.value1 == '单选')
      {
        this.content1 = this.radio
      }
      else if(this.value1 == '多选')
      {
         
        this.content1 = this.checkList

      }
      else if(this.value1 == '文本')
      {

        this.content1 = this.input

      }
      else if(this.value1 == '时间选择器')
      {

        this.content1 = this.datetime

      }
      else if(this.value1 == '多行文本')
      {

        this.content1 = this.textarea

      }
      this.dialogVisible = false;
    },
    value2Change() {
      // alert(this.radio);
      if(this.value2 == '单选')
      {
        this.key2 = 'Single'
        this.position2 = '0'
      }
      else if(this.value2 == '多选')
      {
          this.key2 ='Checkbox'
        this.position2 = '1'

      }
      else if(this.value2 == '文本')
      {
          this.key2 ='Text'
        this.position2 = '2'

      }
      else if(this.value2 == '时间选择器')
      {
          this.key2 ='DateTime'
        this.position2 = '3'

      }
      else if(this.value2 == '多行文本')
      {
          this.key2 ='MutiText'
        this.position2 = '4'

      }
    },
    Save2()
    {
      if(this.value2 == '单选')
      {
        this.content2 = this.radio2
      }
      else if(this.value2 == '多选')
      {
         
        this.content2 = this.checkList2

      }
      else if(this.value2 == '文本')
      {

        this.content2 = this.input2

      }
      else if(this.value2 == '时间选择器')
      {

        this.content2 = this.datetime2

      }
      else if(this.value2 == '多行文本')
      {

        this.content2 = this.textarea2

      }
            this.dialogVisible1 = false;
    },
    createFlow() {
      let params1 = {
        user_id: window.sessionStorage.getItem("user_id"),
        flow_defination_name: this.flow_defination_name,
        action_list: [
          {
            action_id: this.triggerOptions[this.triggerValue].ActionId,
            action_name: this.triggerOptions[this.triggerValue].ActionName,
            action_position: '1',
            action_type:'1',
            action_icon: this.triggerOptions[this.triggerValue].ActionIcon,
            behavior_instance_list: [{
              title:this.value1,
              key:this.key1,
              value:this.content1,
              position:this.position1,
              options:[]
              
            }]
          },
          {
            action_id: this.actionOptions[this.actionValue].ActionId,
            action_name: this.actionOptions[this.actionValue].ActionName,
            action_position: '2',
            action_type:'2',
            action_icon: this.actionOptions[this.actionValue].ActionIcon,
            behavior_instance_list: [{
              title:this.value2,
              key:this.key2,
              value:this.content2,
              position:this.position2,
              options:[]
              
            }]
          }
        ]
      };
      let params = JSON.stringify(params1);

      this.$http
        .post("http://49.235.180.218:19999/createFlowDefination", params)
        .then(res => {
          console.log("创建库的返回值", res);
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