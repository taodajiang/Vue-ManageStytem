<template>
    <div>
        <page-title :title="title"></page-title>  <br>
        <div class="head">
          <div class="search">
              <span>类型：</span>
              <el-select v-model="type" class="margin-right-common">
                <el-option v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>截止时间：</span>
              <el-date-picker @change="changeBeginTime" :editable="false" v-model="startTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <span>到</span>
              <el-date-picker class="margin-right-common" @change="changeEndTime" :editable="false" v-model="endTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <el-button type="primary" size="small" @click="search">查询</el-button>
          </div>
        </div>
        <div class="operate">
              <el-button type="primary" @click="pushClick" size="small">推送</el-button>
              <el-button type="primary" @click="addDigest" size="small">加精</el-button>
              <el-button type="primary" @click="addStick" size="small">置顶</el-button>
        </div>
        <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="55">
                </el-table-column>
                <el-table-column prop="temp" label="保险产品名称" align="center">
                </el-table-column>
                <el-table-column prop="topic" label="类型" align="center">
                </el-table-column>
                <el-table-column prop="topicTitle" label="截止时间" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="operate-modify" @click="modify">修改</el-button>
                    <el-button type="text" class="operate-del" @click="remove">删除</el-button>
                  </template>
                </el-table-column>              
              </el-table>
        </div>
        <div class="message_pagination">
            <pagination :paginationData="paginationData"></pagination>
        </div>
        <!-- 推送/加精/置顶设置 -->
        <div class="push" v-show="showFlag1">
          <div class="pushBox" ref="box">
            <h3>{{text}}</h3>
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="form" :label-position="labelPosition">
              <el-form-item label="产品名称" prop="productName" class="item">
                  <el-input v-model.trim="ruleForm.productName" placeholder="输入产品名称" class="item"></el-input>
              </el-form-item>
              <el-form-item label="推送栏目" prop="pushPart" class="item" v-show="flag1">
                  <el-select v-model="ruleForm.pushPart" class="item">
                    <el-option v-for="item in partItem"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="营销标签" prop="sellTag" class="item" v-show="flag2">
                  <el-select v-model="ruleForm.sellTag" class="item">
                    <el-option v-for="item in tagItem"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="截止时间" prop="deadline" class="item">
                  <el-date-picker
                      v-model="ruleForm.deadline"
                      type="date"
                      placeholder="选择日期" class="item">
                  </el-date-picker>
              </el-form-item>
              <el-form-item class="pushBtn">
                <el-button @click="pushConfirm">确定</el-button>
                <el-button @click="pushClose">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
    </div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import Pagination from "../../components/Pagination";
export default {
  name: "TopicManage",
  components: { PageTitle, Pagination },
  data() {
    return {
      //顶部搜索数据
      title: "产品营销",
      type: 1,
      typeList: [
        {
          value: 1,
          label: "模板一"
        },
        {
          value: 2,
          label: "模板二"
        }
      ],
      startTime: "",
      endTime: "",
      //表格数据
      tableData: [
        {
          temp: "模板1"
        },
        {
          temp: "模板1"
        },
        {
          temp: "模板1"
        },
        {
          temp: "模板1"
        }
      ],
      //推送/加精/置顶设置弹框数据
      showFlag1: false,
      flag1: false,
      flag2: false,
      isStick: false, //设置两项弹窗高度
      text: "",
      ruleForm: {
        productName: "",
        pushPart: "",
        sellTag: "",
        deadline: ""
      },
      labelPosition: "right",
      partItem: [
        {
          value: 1,
          label: "栏目一"
        },
        {
          value: 2,
          label: "栏目二"
        }
      ],
      tagItem: [
        {
          value: 1,
          label: "栏目一"
        },
        {
          value: 2,
          label: "栏目二"
        }
      ],

      paginationData: {
        total: 10,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        currentPage: 1,
        handleSizeChange: val => {
          this.paginationData.pageSize = val;
          this.pageRow = val;
          this.getList();
        },
        handleCurrentChange: val => {
          this.pageNo = val;
          this.paginationData.currentPage = val;
          this.getList();
        }
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    search(){},
    pushClick() {
      this.showFlag1 = true;
      this.flag1 = true;
      this.text = "推送设置";
      this.$refs.box.style.height = "345px";
    },
    addDigest() {
      this.showFlag1 = true;
      this.flag2 = true;
      this.text = "加精设置";
      this.$refs.box.style.height = "345px";
    },
    addStick() {
      this.showFlag1 = true;
      this.text = "置顶设置";
      this.$refs.box.style.height = "284px";
    },
    pushConfirm() {
      this.showFlag1 = false;
      this.flag1 = false;
      this.flag2 = false;
    },
    pushClose() {
      this.showFlag1 = false;
      this.flag1 = false;
      this.flag2 = false;
    },
    modify(){},
    remove(){},
    //开始时间结束
    changeBeginTime() {
      if (this.endTime) {
        if (this.calEndTime - this.calBeginTime < 0) {
          this.$message("开始时间不能大于结束时间");
          this.startTime = "";
        }
      }
    },
    //选择结束
    changeEndTime() {
      if (this.endTime) {
        if (this.calEndTime - this.calBeginTime < 0) {
          this.$message("结束时间不能小于开始时间");
          this.endTime = "";
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 20px;
}
.operate {
  margin-bottom: 20px;
}
.message_pagination {
  margin: 30px 0px;
}
.push {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .pushBox2 {
    height: 284px;
  }
  .pushBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 345px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background-size: 488px 120px;
      margin: 0px;
    }
    .item {
      width: 400px;
      .el-input {
        width: 250px;
        margin-left: -50px;
      }
      .el-select {
        width: 250px;
        margin-left: -50px;
      }
    }
    .pushBtn {
      margin-left: -100px;
    }
    .el-button {
      width: 100px;
      margin: 20px 20px;
    }
  }
}
</style>
