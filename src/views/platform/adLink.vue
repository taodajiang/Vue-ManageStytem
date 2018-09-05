<template>
    <div>
        <page-title :title="title"></page-title>  <br>
        <div class="head">
          <div class="search">
              <span>位置：</span>
              <el-select v-model="temp" class="margin-right-common">
                <el-option v-for="item of tempType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>状态：</span>
              <el-select v-model="checkStatus" class="margin-right-common">
                <el-option v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>过期时间：</span>
              <el-date-picker @change="changeBeginTime" :editable="false" v-model="startTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <span>到</span>
              <el-date-picker class="margin-right-common" @change="changeEndTime" :editable="false" v-model="endTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <el-input v-model.trim="keyword" placeholder="名称/发布人" class="keyword margin-right-common" style="width:300px"></el-input>
              <el-button type="primary" size="small" @click="search">查询</el-button>
          </div>
        </div>
        <div class="operate">
              <el-button type="primary" @click="add" size="small">新增</el-button>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="temp" label="名称" align="center">
                </el-table-column>
                <el-table-column prop="topic" label="位置" align="center">
                </el-table-column>
                <el-table-column prop="topicTitle" label="生效时间" align="center">
                </el-table-column>
                <el-table-column prop="productNum" label="备注" align="center">
                </el-table-column>
                <el-table-column prop="modifier" label="最新修改时间" align="center">
                </el-table-column>
                <el-table-column prop="modifyTime" label="发布人" align="center">
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="operate-search" @click="check">查看</el-button>
                    <el-button type="text" class="operate-rests" @click="putaway">上架</el-button>
                    <el-button type="text" class="operate-modify" @click="modify">修改</el-button>
                    <el-button type="text" class="operate-del" @click="remove">删除</el-button>
                  </template>
                </el-table-column>              
          </el-table>
        </div>
        <div class="message_pagination">
            <pagination :paginationData="paginationData"></pagination>
        </div>
        
        <!-- 查看/新增/修改弹框 -->
        <div class="addLinkBox" v-show="showFlag1">
            <div class="addBox">
                <h3>{{boxTitle}}</h3>
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="form" :label-position="labelPosition">
                    <el-form-item label="名称" prop="adName" class="item">
                        <el-input v-model="ruleForm.adName"></el-input>
                    </el-form-item>
                    <el-form-item label="链接" prop="adLink" class="item">
                        <el-input v-model="ruleForm.adLink"></el-input>
                    </el-form-item>
                    <el-form-item label="位置" prop="location" class="item">
                      <el-select v-model="ruleForm.location" class="local">
                        <el-option v-for="item of locationList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="图片" prop="pictureUpload" class="item">
                      <el-upload
                        action="imgUpload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                      >
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                    </el-form-item>
                    <el-form-item label="生效时间" prop="effectiveTime" class="item">
                      <el-date-picker
                            v-model="ruleForm.effectiveTime"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00']"
                            class="imgUpload">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark" class="item">
                        <el-input type="textarea" :rows="5" v-model="ruleForm.remark" maxlength="50"></el-input>
                        <span>长度不超过50个字符</span>
                    </el-form-item>
                    <el-form-item class="item">
                        <el-button type="primary" @click="confirm">保存</el-button>
                        <el-button @click="close">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 上架弹窗 -->
        <div class="putaway" v-show="showFlag2">
          <div class="putawayBox">
            <h3>提示</h3>
            <div class="tips">{{text}}</div>
            <div class="putawayBtn">
            <el-button type="primary" @click="putawayConfirm">确定</el-button>
            <el-button @click="putawayClose">取消</el-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import Pagination from "../../components/Pagination";
export default {
  name: "TopicManage",
  components: { Pagination, PageTitle },
  data() {
    return {
      //顶部搜索数据
      title: "广告链接",
      temp: 1,
      tempType: [
        {
          value: 1,
          label: "模板一"
        },
        {
          value: 2,
          label: "模板二"
        }
      ],
      checkStatus: 2,
      statusList: [
        {
          value: 1,
          label: "待上架"
        },
        {
          value: 2,
          label: "已上架"
        },
        {
          value: 3,
          label: "已下架"
        }
      ],
      startTime: "",
      endTime: "",
      keyword: "",
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
      //查看/新增/修改弹框数据
      showFlag1: false,
      boxTitle: "新增广告链接",
      ruleForm: {
        adName: "张三",
        adLink: "",
        location: 0,
        effectiveTime: "",
        remark: ""
      },
      labelPosition: "right",
      locationList: [
        {
          value: 0,
          label: "首页banner"
        },
        {
          value: 1,
          label: "首页活动广告位"
        }
      ],
      dialogImageUrl: "",
      dialogVisible: false,
      imgUpload: "",
      //上架弹窗数据
      showFlag2: false,
      text: "",

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
    search() {},
    add() {
      this.showFlag1 = true;
    },
    check() {
      this.showFlag1 = true;
    },
    confirm() {
      this.showFlag1 = false;
    },
    close() {
      this.showFlag1 = false;
    },
    putaway() {
      this.showFlag2 = true;
      this.text = "是否上架?";
    },
    putawayConfirm() {
      this.showFlag2 = false;
    },
    putawayClose() {
      this.showFlag2 = false;
    },
    modify() {
      this.showFlag1 = true;
    },
    remove() {
      this.showFlag2 = true;
      this.text = "是否删除?";
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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

<style lang="less">
.search {
  margin-bottom: 20px;
}
.operate {
  margin-bottom: 20px;
}
.message_pagination {
  margin: 30px 0px;
}
.addLinkBox {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .addBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 60px;
      line-height: 120px;
      text-align: center;
      background-size: 488px 120px;
      margin: 0px;
    }
    .form {
      margin-top: 50px;
      .el-upload--picture-card {
        width: 300px;
      }
    }
    .item {
      width: 400px;
      margin: 20px 20px 0px;
      .local {
        margin-left: -80px;
      }
      .imgUpload {
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
