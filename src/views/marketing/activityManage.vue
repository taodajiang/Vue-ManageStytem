<template>
    <div>
        <page-title :title="title"></page-title>  <br>
        <div class="head">
            <div class="search">
              <div>
                <span>活动编号：</span>
                <el-input v-model.trim="activityNumber" class="margin-right-common" style="width:200px"></el-input>
                <span>活动名称：</span>
                <el-input v-model.trim="activityName" class="margin-right-common" style="width:200px"></el-input>
                <span>活动类型：</span>
                <el-select v-model="activityType" placeholder="请选择" class="margin-right-common">
                    <el-option v-for="item in typeList"
                                :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                </el-select>
                <span>活动状态：</span>
                <el-select v-model="activityStatus" placeholder="请选择">
                    <el-option v-for="item in statusList"
                                :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                </el-select>
              </div>
              <br>
              <div>
                <span>开始时间：</span>
                <el-date-picker v-model="begintimeB" type="date" placeholder="选择日期">
                </el-date-picker>
                <span>至</span>
                <el-date-picker v-model="endtimeB" type="date" placeholder="选择日期" style="margin-right:65px">
                </el-date-picker>
                <span>结束时间：</span>
                <el-date-picker v-model="begintimeE" type="date" placeholder="选择日期">
                </el-date-picker>
                <span>至</span>
                <el-date-picker v-model="endTimeE" type="date" placeholder="选择日期" class="margin-right-common">
                </el-date-picker>
                <el-button type = "primary" size="small" icon = "el-icon-search" @click="search">查询</el-button>
              </div>
            </div>
        </div>
        <div class="operate">
          <el-button type="primary" @click="add" size="small">新增</el-button>
        </div>
        <div>
          <el-table :data = "tableData" style = "width: 100%" stripe>
            <el-table-column label = "活动编号" prop = "number" align = "center">
            </el-table-column>
            <el-table-column label = "活动名称" prop = "name" align = "center">
            </el-table-column>
            <el-table-column label = "奖励类型" prop = "reward" align = "center">
            </el-table-column>
            <el-table-column label = "活动类型" prop = "activity" align = "center">
            </el-table-column>
            <el-table-column label = "活动开始时间" prop = "begintime" align = "center">
            </el-table-column>
            <el-table-column label = "活动结束时间" prop = "endtime" align = "center">
            </el-table-column>
            <el-table-column label = "活动状态" prop = "state" align = "center">
            </el-table-column>
            <el-table-column label = "操作时间" prop = "time" align = "center">
            </el-table-column>
            <el-table-column label = "操作" align = "center">
                <template slot-scope="scope">
                  <el-button type = "text" class = "operate-search" @click = "check">查看</el-button>
                  <el-button type = "text" class = "operate-modify" @click = "modify">修改</el-button>
                  <el-button type = "text" class = "operate-rests" @click = "putaway">上架</el-button>
                  <el-button type = "text" class = "operate-rests" @click = "soldout">下架</el-button>
                  <el-button type = "text" class = "operate-del" @click = "remove">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="message_pagination">
            <pagination :paginationData="paginationData"></pagination>
        </div>

        <!-- 上架/下架/删除弹框 -->
        <div class = "putaway" v-show = "showFlag1">
          <div class="putawayBox">
            <h3>提示</h3>
            <div class="tips">确定{{remindWords}}本次活动</div>
            <div class="putawayBtn">
              <el-button type="primary" @click="putawayConfirm">确定</el-button>
              <el-button @click="putawayClose">取消</el-button>
            </div>
          </div>
        </div>

        <!-- 新增弹框  -->
        <div class = "addActive" v-show = "showFlag2">
          <div class="boxes">
            <h3>{{addText}}</h3>
            <el-form :model="ruleForm1" ref="ruleForm1" :rules="rules1" label-width="100px" class="form" :label-position="labelPosition1">
              <el-form-item label="活动类型" prop="activeType" class="item">
                  <el-select v-model="ruleForm1.activeType" class="item">
                    <el-option v-for="item in typeList"
                                :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="奖励类型" prop="rewardType" class="item">
                  <el-select v-model="ruleForm1.rewardType" class="item">
                    <el-option v-for="item in rewardTypeList"
                                :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item class="addBtn">
                <el-button @click="addConfirm">下一步</el-button>
                <el-button @click="addClose">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>

        <!-- 查看/修改弹框 -->
        <div class="checkActive" v-show="showFlag3">
            <div class="checkActiveBox">
                <h3>{{boxTitle}}</h3>
                <el-form :model="ruleForm2" ref="ruleForm2" :rules="rules2" label-width="100px" class="form" :label-position="labelPosition2">
                    <el-form-item label="奖励类型" prop="award" class="item">
                        <p>{{ruleForm2.award}}</p>
                    </el-form-item>
                    <el-form-item label="活动类型" prop="typeWord" class="item">
                        <p>{{ruleForm2.typeWord}}</p>
                    </el-form-item>
                    <el-form-item label="活动名称" prop="activeName" class="item">
                      <el-input v-model="ruleForm2.activeName"></el-input>
                    </el-form-item>
                    <el-form-item label="活动开始时间" prop="startTime" class="item">
                      <el-date-picker v-model="ruleForm2.startTime" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间" prop="endTime" class="item">
                      <el-date-picker v-model="ruleForm2.endTime" type="date" placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="赠送规则" prop="donateRule" class="item">
                      <el-input v-model="ruleForm2.donateRule">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark" class="item">
                        <el-input type="textarea" :rows="5" v-model="ruleForm2.remark" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item class="item">
                        <el-button type="primary" @click="back">上一步</el-button>
                        <el-button @click="confirm">确定</el-button>
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
  name: "ActivityManage",
  components: { PageTitle, Pagination },
  data() {
    return {
      //顶部搜索数据
      title: "活动管理",
      activityNumber: "",
      activityName: "",
      activityType: "",
      typeList: [{}],
      activityStatus: "",
      statusList: [{}],
      begintimeB: "",
      endtimeB: "",
      begintimeE: "",
      endTimeE: "",
      //表格数据
      tableData: [
        {
          number: "模板1"
        },
        {
          number: "模板1"
        },
        {
          number: "模板1"
        },
        {
          number: "模板1"
        }
      ],
      //上架/下架/删除弹框数据
      showFlag1: false,
      remindWords: "",
      //新增弹框数据
      showFlag2: false,
      addText: "新增活动",
      ruleForm1: {
        activeType: "",
        rewardType: ""
      },
      rules1: {},
      rewardTypeList: [{}],
      labelPosition1: "right",
      //查看/修改弹框
      showFlag3: false,
      boxTitle: "",
      ruleForm2: {
        award: "",
        typeWord: "",
        activeName: "",
        startTime: "",
        endTime: "",
        donateRule: "",
        remark: ""
      },
      rules2: {},
      labelPosition2: "right",
      paginationData: {
        total: 100,
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
      }
    };
  },
  methods: {
    search() {},
    add() {
      this.showFlag2 = true;
    },
    check() {
      this.showFlag3 = true;
    },
    modify() {
      this.showFlag3 = true;
    },
    putaway() {
      this.showFlag1 = true;
      this.remindWords = "上架"
    },
    soldout() {
      this.showFlag1 = true;
      this.remindWords = "下架"
    },
    remove() {
      this.showFlag1 = true;
      this.remindWords = "删除"
    },
    putawayConfirm() {
      this.showFlag1 = false;
    },
    putawayClose() {
      this.showFlag1 = false;
    },
    addConfirm() {
      this.showFlag2 = false;
      this.showFlag3 = true;
      this.boxTitle = "新增活动";
    },
    addClose() {
      this.showFlag2 = false;
    },
    back() {
      this.showFlag3 = false;
      this.showFlag2 = true;
    },
    confirm() {
      this.showFlag3 = false;
    }
  }
};
</script>

<style lang = "less" scoped>
.search {
  margin-bottom: 20px;
}
.operate {
  margin-bottom: 20px;
}
.message_pagination {
  margin: 30px 0px;
}
.addActive {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .boxes {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 285px;
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
    .addBtn {
      margin-left: -100px;
    }
    .el-button {
      width: 100px;
      margin: 20px 20px;
    }
  }
}
.checkActive {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .checkActiveBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 540px;
    height: 700px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 80px;
      line-height: 115px;
      text-align: center;
      background-size: 488px 120px;
      margin: 0px;
    }
    .item {
      width: 400px;
      margin: 20px 20px 0px 46px;
      .el-input {
        width: 300px;
      }
      .el-select {
        width: 300px;
      }
    }
    .el-button {
      width: 100px;
      margin: 20px 20px;
    }
  }
}
.putaway {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .putawayBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 200px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 60px;
      line-height: 60px;
      text-align: center;
      margin: 0px;
      background-color: #333;
      color: #fff;
      letter-spacing: 5px;
      border-radius: 10px 10px 0 0;
    }
    .tips {
      height: 80px;
      line-height: 80px;
      font-size: 18px;
    }
    .putawayBtn {
      .el-button {
        margin: 0px 20px;
      }
    }
  }
}
</style>
