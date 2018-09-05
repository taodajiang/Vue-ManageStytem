<template>
    <div>
      <div v-show="showFlag1">
        <page-title :title="title"></page-title>  <br>
        <div class="head">
          <div class="search">
              <span>模板：</span>
              <el-select v-model="temp" class="margin-right-common">
                <el-option v-for="item in tempType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>审核状态：</span>
              <el-select v-model="checkStatus" class="margin-right-common">
                <el-option v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>修改时间：</span>
              <el-date-picker @change="changeBeginTime" :editable="false" v-model="startTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <span>到</span>
              <el-date-picker class="margin-right-common" @change="changeEndTime" :editable="false" v-model="endTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <el-input v-model="modifier" placeholder="标题关键词/修改人" class="modifier margin-right-common" style="width:300px"></el-input>
              <el-button type="primary" size="small" @click="search">查询</el-button>
          </div>
          <div class="operate">
              <el-button type="primary" @click="add" size="small">新增</el-button>
              <el-button type="primary" @click="putaway" size="small">上架模板</el-button>
          </div>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="selection" width="55" label="全选">
                </el-table-column>
                <el-table-column type="index" label="序号" align="center" width="55">
                </el-table-column>
                <el-table-column prop="Templet" label="模板" align="center">
                </el-table-column>
                <el-table-column prop="ThematicOptions" label="专题" align="center">
                </el-table-column>
                <el-table-column prop="Name" label="专题标题" align="center">
                </el-table-column>
                <el-table-column prop="vukovn" label="管理产品数量(个)" align="center">
                </el-table-column>
                <el-table-column prop="Modifier" label="修改人" align="center">
                </el-table-column>
                <el-table-column prop="AddTime" label="最后修改时间" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="状态" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="operate-search" @click="check">查看</el-button>
                    <el-button type="text" class="operate-modify" @click="modify">修改</el-button>
                    <el-button type="text" class="operate-del" @click="remove">删除</el-button>
                  </template>
                </el-table-column>              
              </el-table>
        </div>
        <div class="message_pagination">
          <pagination :paginationData="paginationData"></pagination>
        </div>
      </div>

      <!-- 新增/修改/查看页面 -->
      <div class="refresh" v-show="!showFlag1">
        <h3>{{topText}}</h3>
        <div class="boxes">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form" :label-position="labelPosition">
              <el-form-item label="选择模板" prop="selectTemp" class="item" style="margin-right:110px">
                  <el-select v-model="ruleForm.selectTemp" class="item">
                    <el-option v-for="item in tempType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="选择专题" prop="topic" class="item">
                  <el-select v-model="ruleForm.topic" class="item">
                    <el-option v-for="item in topicType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="专题名称" prop="topicName" style="width:900px">
                  <el-input v-model.trim="ruleForm.topicName" class="item"></el-input>
              </el-form-item>
              <el-form-item label="关联保险产品" prop="relatedProduct" class="item">
                    <el-select v-model="ruleForm.relatedProduct" filterable placeholder="请选择">
                      <el-option
                        v-for="item in relatedProductList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-button type="primary" size="small">添加</el-button>
                    <div class="tags">
                      <ul>
                        <li>熊大<i class="el-icon-circle-close-outline"></i></li>
                        <li>熊大</li>
                        <li>熊大</li>
                        <li>熊大</li>
                        <li>熊大</li>
                        <li>熊大</li>
                        <li>熊大</li>
                        <li>熊大</li>
                        <li>熊大</li>
                      </ul>
                    </div>
              </el-form-item>
              <el-form-item label="专题封面" prop="topicCover" class="item">
                  <el-upload action="imgUpload"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview1"
                            :on-remove="handleRemove1">
                            <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible1">
                      <img width="100%" :src="dialogImageUrl1" alt="">
                  </el-dialog>
                  <span style="color:#ccc;">注意：仅支持jpg、jpeg、png格式</span>
              </el-form-item>
              <el-form-item label="专题内页" prop="insidePage" class="item">
                  <el-upload action="imgUpload"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview2"
                            :on-remove="handleRemove2">
                            <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible2">
                      <img width="100%" :src="dialogImageUrl2" alt="">
                  </el-dialog>
                  <span style="color:#ccc;">注意：仅支持jpg、jpeg、png格式</span>
              </el-form-item>
              <el-form-item label="简介" prop="intro" class="item">
                <editor style="height:350px;width:750px;background-color:#fff;border:1px solid #ccc;left:200px;overflow-y: auto;overflow-x: hidden;" ref="editorContent" :description="articleContent"></editor>
              </el-form-item>
              <el-form-item class="pushBtn">
                <el-button @click="pushConfirm">确定</el-button>
                <el-button @click="pushClose">取消</el-button>
              </el-form-item>
            </el-form>
        </div>
      </div> 
        
        <!-- 上架弹窗 -->
      <div class="popup" v-show="showFlag2">
        <div class="popupBox">
          <h3>提示</h3>
          <div class="tips">{{text}}</div>
          <div class="popupBtn">
            <el-button type="primary" @click="popupConfirm">确定</el-button>
            <el-button @click="popupClose">取消</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import Pagination from "../../components/Pagination";
import Editor from "../../components/Editor";
import { getTopicList, getTopicInfo } from "../../api/chRequest.js";
export default {
  name: "TopicManage",
  components: { Pagination, PageTitle, Editor },
  data() {
    return {
      showFlag1: true,
      //顶部搜索数据
      title: "主题管理",
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
      modifier: "",
      //表格数据
      tableData: [
        {
          Templet: "模板1"
        },
        {
          Templet: "模板1"
        },
        {
          Templet: "模板1"
        },
        {
          Templet: "模板1"
        }
      ],
      //新增/修改/查看页面数据
      topText: "",
      labelPosition: "right",
      ruleForm: {
        selectTemp: "",
        topic: "",
        topicName: "",
        relatedProduct: ""
      },
      rules: {
        selectTemp: [
          { required: true, message: "请选择模板", trigger: "change" }
        ],
        topic: [{ required: true, message: "请选择专题", trigger: "change" }],
        topicName: [
          { required: true, message: "请输入专题名称", trigger: "blur" }
        ],
        relatedProduct: [{ required: true }],
        topicCover: [{ required: true }],
        insidePage: [{ required: true }],
        intro: [{ required: true, message: "请输入简介", trigger: "blur" }]
      },
      dialogVisible1:false,
      dialogImageUrl1:'',
      dialogVisible2:false,
      dialogImageUrl2:'',
      topicType: [
        {
          value: 1,
          label: "专题一"
        },
        {
          value: 2,
          label: "专题二"
        }
      ],
      relatedProductList: [
        {
          value: 1,
          label: "111一"
        },
        {
          value: 2,
          label: "222二"
        }
      ],
      articleContent: "",
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
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let parms = {
        templet: this.temp,
        status: this.checkStatus,
        select: this.modifier,
        TimeStart: this.startTime,
        TimeStartEnd: this.endTime,
        pno: 1,
        prow: 1
      };
      getTopicList(parms)
        .then(res => {
          console.log(res)
          if (res.data.Code == 1) {
            this.tableData = res.data.Data.list;
            
          } else {
            // this.$message({ type: "info", message: res.data.Message });
          }
        })
        .catch(function(error) {
          //loading.close();
        });
      getTopicInfo({ id: 1 }).then(res => {
        // console.log(res);
      });
    },
    search() {
      console.log(111);
    },
    add() {
      this.showFlag1 = false;
      this.topText = "新增专题";
    },
    putaway() {
      this.text = "是否上架模板一";
      this.showFlag2 = true;
    },
    pushConfirm() {
      this.showFlag1 = true;
    },
    pushClose() {
      this.showFlag1 = true;
    },
    //表格中的操作
    check() {
      this.showFlag1 = false;
      this.topText = "查看专题";
    },
    modify() {
      this.showFlag1 = false;
      this.topText = "修改专题";
    },
    remove() {
      this.text = "是否删除";
      this.showFlag2 = true;
    },
    popupConfirm() {
      this.showFlag2 = false;
    },
    popupClose() {
      this.showFlag2 = false;
    },
    //文件上传
    handlePictureCardPreview1(file) {
      this.dialogImageUrl1 = file.url;
      this.dialogVisible1 = true;
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl2 = file.url;
      this.dialogVisible2 = true;
    },
    handleRemove2(file, fileList) {
      console.log(file, fileList);
    },
    //富文本编辑
   
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
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .popupBox {
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
    .popupBtn {
      .el-button {
        margin: 0px 20px;
      }
    }
  }
}
.refresh {
  box-sizing: border-box;
  padding: 20px;
  h3 {
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    margin: 0px;
  }
  .boxes {
    width: 66%;
    margin: 0 auto;
    .item {
      display: inline-block;
      .el-upload--picture-card {
        width: 212px;
        height: 100px;
        line-height: 100px;
      }
      .el-select {
        width: 240px;
      }
    }
    .tags {
      overflow: hidden;
      ul {
        width: 750px;
        box-sizing: border-box;
        padding: 0;
        list-style: none;
        li {
          float: left;
          width: 240px;
          height: 40px;
          padding-left: 15px;
          margin: 5px 10px 5px 0px;
          background-color: #fff;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          i {
            float: right;
            margin: 10px;
            font-size: 20px;
          }
        }
      }
    }
  }
}
</style>
