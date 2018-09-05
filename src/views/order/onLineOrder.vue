<template>
      <div v-show="showFlag1">
        <page-title :title="title"></page-title>  <br>
        <div class="head">
          <div class="search">
              <span>下单时间：</span>
              <el-date-picker @change="changeBeginTime" :editable="false" v-model="startTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <span>到</span>
              <el-date-picker class="margin-right-common" @change="changeEndTime" :editable="false" v-model="endTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <span>承保状态：</span>
              <el-select v-model="status1" class="margin-right-common">
                <el-option v-for="item in status1List"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>保单状态：</span>
              <el-select v-model="status2" class="margin-right-common">
                <el-option v-for="item in status2List"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>订单状态：</span>
              <el-select v-model="status3" class="margin-right-common">
                <el-option v-for="item in status3List"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="keyword" placeholder="订单编号/手机号/用户名/产品名称/销售名称/备注" class="modifier margin-right-common" style="width:300px;margin-top:20px"></el-input>
              <el-button type="primary" size="small" @click="search">查询</el-button>
          </div>
          <div class="operate" style="margin:20px 0">
              <el-button type="primary" @click="addClick" size="small">导出</el-button>
          </div>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="55">
                </el-table-column>
                <el-table-column prop="Templet" label="订单号" align="center">
                </el-table-column>
                <el-table-column prop="ThematicOptions" label="产品名称" align="center">
                </el-table-column>
                <el-table-column prop="Name" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="vukovn" label="投保人" align="center">
                </el-table-column>
                <el-table-column prop="Modifier" label="价格（元）" align="center">
                </el-table-column>
                <el-table-column prop="AddTime" label="下单时间" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="投保单号" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="保险单号" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="承保状态" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="保单状态" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="订单状态" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="销售" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="备注" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="operate-search">查看</el-button>
                    <el-button type="text" class="operate-modify">备注</el-button>
                  </template>
                </el-table-column>              
              </el-table>
        </div>
        <div class="message_pagination">
          <pagination :paginationData="paginationData"></pagination>
        </div>
      </div>
       
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import Pagination from "../../components/Pagination";
export default {
  name: "OnLineOrder",
  data() {
    return {
      //顶部搜索数据
      showFlag1: true,
      title: "线上订单管理",
      startTime: "",
      endTime: "",
      status1: "",
      status2: "",
      status3: "",
      status1List: [{}],
      status2List: [{}],
      status3List: [{}],
      keyword: "",
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
  components: { Pagination, PageTitle }
};
</script>

<style>
</style>
