<template>
<div class="online_content">
    <div class="fMainBoxBody">
        <page-title :title="title"></page-title>
        <div class="fSearchRow">
            <span>保险类型：</span>
            <el-select class="insurtype fmar06" v-model="fInsurtype" placeholder="请选择">
                <el-option v-for="item in insurType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <span>修改时间：</span>
            <el-date-picker v-model="beginTime" type="date" placeholder="选择日期">
            </el-date-picker>
            <span>至</span>
            <el-date-picker v-model="endTime" type="date" placeholder="选择日期" class="fmar06">
            </el-date-picker>
            <el-input v-model.trim="keyword" class="fKeyWord" placeholder="公司名称/保险名称/产品编号" prefix-icon="el-icon-search"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="fTopSearch(1)">查询</el-button>
        </div>
        <el-button type="primary" icon="el-icon-plus" @click="fShowAdd">新增</el-button>
        <div class="product_table">
            <el-table :data="fTableData" scope="scope" :row-style="rowClass" :row-class-name="getRowClass">
                <el-table-column type="index" label="序号" align="center">
                </el-table-column>
                <el-table-column prop="number" label="产品编号" align="center">
                </el-table-column>
                <el-table-column prop="type" label="保险类型" :formatter="fInsurTypeFor" align="center">
                </el-table-column>
                <el-table-column prop="company" label="保险公司" align="center">
                </el-table-column>
                <el-table-column prop="name" label="保险名称" align="center">
                </el-table-column>
                <el-table-column prop="plan" label="保障计划" align="center">
                </el-table-column>
                <el-table-column prop="user" label="修改人" align="center">
                </el-table-column>
                <el-table-column prop="time" label="修改时间" :formatter="fCreatTimeA" align="center" width="150">
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" class="check" @click="fCheck(scope.row)">查看</el-button>
                        <el-button type="text" class="modifier" @click="fModifier(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-form label-position="right" inline class="demo-table-expand">
                            <el-button type="text" class="edition" @click="fEdition(scope.row)">版本</el-button>
                            <el-button type="text" class="copylink" @click="fCopylink(scope.row)">复制链接</el-button>
                            <el-button type="text" class="soldout" @click="fSoldout(scope.row)">下架</el-button>
                            <el-button type="text" class="putaway" @click="fSoldout(scope.row)">上架</el-button>
                            <el-button type="text" class="extend" @click="fExtend(scope.row)">扩展</el-button>
                        </el-form>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="fPageMart">
            <pagination :paginationData="paginationData"></pagination>
        </div>
    </div>
    <div class="fShadow" v-if="fShadow" @click="fCloseAll"></div>
    <div class="fAlertBoxS fAlertBoxSt" v-if="fSoldoutShow">
        asdasd
    </div>
</div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import Pagination from "../../components/Pagination";
import global from "../../Global.js";
import axios from "axios";
import { Message, MessageBox } from "element-ui";
import { fFDateA } from "../../utils/fBase.js";
export default {
  name: "OnLine",
  data() {
    return {
      title: "线上产品管理",
      beginTime: "",
      endTime: "",
      keyword: "",
      fInsurtype: "",
      fShadow: false, //遮罩层显示
      fSoldoutShow: false, //上下架显示
      insurType: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "一级分类"
        },
        {
          value: "2",
          label: "二级分类"
        }
      ],
      fTableData: [
        {
          number: "1",
          type: "1",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "1",
          status: "2"
        },
        {
          number: "2",
          type: "2",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "0",
          status: "1"
        },
        {
          number: "3",
          type: "1",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "0",
          status: "2"
        },
        {
          number: "4",
          type: "1",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "0",
          status: "1"
        },
        {
          number: "5",
          type: "2",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "1",
          status: "2"
        },
        {
          number: "6",
          type: "2",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "1",
          status: "2"
        },
        {
          number: "7",
          type: "1",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "0",
          status: "1"
        },
        {
          number: "8",
          type: "1",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "1",
          status: "2"
        },
        {
          number: "9",
          type: "1",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "1",
          status: "2"
        },
        {
          number: "10",
          type: "1",
          company: "666",
          name: "666",
          plan: "666",
          user: "666",
          time: "1535990400",
          fSXJ: "0",
          status: "2"
        }
      ],
      fChoseRow: null,
      paginationData: {
        total: 100,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        currentPage: 1,
        handleSizeChange: val => {
          this.paginationData.currentPage = 1;
          this.paginationData.pageSize = val;
          this.fSearchList();
        },
        handleCurrentChange: val => {
          this.paginationData.currentPage = val;
          this.fSearchList();
        }
      }
    };
  },
  components: {
    PageTitle,
    Pagination
  },
  created() {
    this.fSearchList();
  },
  methods: {
    //类型格式化
    fInsurTypeFor(row) {
      let fInsurChose = row.type;
      let fInsurCont = "";
      let tempInsurList = this.insurType;
      tempInsurList.forEach(item => {
        if (fInsurChose == item.value) {
          fInsurCont = item.label;
        }
      });
      return fInsurCont;
    },
    //时间格式化
    fCreatTimeA(row) {
      return fFDateA(row.time);
    },
    //table，根据情况展示额外行
    getRowClass(val) {
      // val.row.NewsStatus
      let fass = val.row.status;
      if (fass == "2") {
        return "show-expand";
      } else {
        return "hide-expand";
      }
    },
    //顶部搜索
    fTopSearch(num) {
      this.paginationData.currentPage = num;
      this.fSearchList();
    },
    //搜索事件
    fSearchList() {
      let fBegunTime = this.beginTime;
      let fEndTime = this.endTime;
      if (fBegunTime) {
        fBegunTime = fBegunTime / 1000;
      }
      if (fEndTime) {
        fEndTime = fEndTime / 1000;
      }
      let fParams = {
        pNo: this.paginationData.currentPage,
        pRow: this.paginationData.pageSize,
        insurtype: this.fInsurtype,
        beginTime: fBegunTime,
        endTime: fEndTime,
        keyword: this.keyword
      };
      console.log(fParams);
    },
    //新增显示事件
    fShowAdd() {
      this.fShadow = true;
      console.log("新增显示事件");
    },
    //查看显示
    fCheck(row) {
      this.fShadow = true;
      console.log("查看显示");
    },
    //修改显示
    fModifier(row) {
      this.fShadow = true;
      console.log("修改显示");
    },
    //版本显示
    fEdition(row) {
      this.fShadow = true;
      console.log("版本显示");
    },
    //复制链接显示
    fCopylink(row) {
      this.fShadow = true;
      console.log("复制链接显示");
    },
    //上下架显示
    fSoldout(row) {
      this.fShadow = true;
      this.fSoldoutShow = true;
      this.fChoseRow = row;
      console.log(this.fChoseRow);
      if (row.fSXJ == "0") {
        //上架状态，下架操作

      } else if (row.fSXJ == "1") {
        //下架状态，上架操作
      }
      console.log("下架显示");
    },
    //扩展显示
    fExtend(row) {
      this.fShadow = true;
      console.log("扩展显示");
    },
    //关闭所有弹窗
    fCloseAll(row) {
      this.fShadow = false;
      this.fSoldoutShow = false;
      this.fChoseRow = null;
    },
    //控制表格隔行换色
    rowClass(row, index) {
      if (row.rowIndex % 2 == 1) {
        return {
          "background-color": "#e9e9e9"
        };
      }
    }
  }
};
</script>

<style lang="less">
.online_content {
  @import "../../styles/fBase.less";
}
</style>
