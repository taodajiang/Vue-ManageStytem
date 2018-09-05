<template>
      <div v-show="showFlag1">
        <page-title :title="title"></page-title>  <br>
        <div class="head">
          <div class="search">
              <span>分配状态：</span>
              <el-select v-model="status1" class="margin-right-common">
                <el-option v-for="item in status1List"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>跟进状态：</span>
              <el-select v-model="status2" class="margin-right-common">
                <el-option v-for="item in status2List"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>是否下单：</span>
              <el-select v-model="status3" class="margin-right-common">
                <el-option v-for="item in status3List"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select>
              <span>地址：</span>
              <el-select v-model="status4" class="margin-right-common">
                <el-option v-for="item in status4List"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                </el-option>
              </el-select> <br> 
              <span>下单时间：</span>
              <el-date-picker @change="changeBeginTime" :editable="false" v-model="startTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <span>到</span>
              <el-date-picker class="margin-right-common" @change="changeEndTime" :editable="false" v-model="endTime" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
              <el-input v-model="keyword" placeholder="用户名/手机号/服务人员/保险产品名称" class="modifier margin-right-common" style="width:300px;margin-top:20px"></el-input>
              <el-button type="primary" size="small" @click="search">查询</el-button>
          </div>
          <div class="operate" style="margin:20px 0">
              <el-button type="primary" @click="addClick" size="small">导出</el-button>
              <el-button type="primary" @click="addClick" size="small">指派</el-button>
          </div>
        </div>
        <div>
          <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="selection" width="55" label="全选">
                </el-table-column>
                <el-table-column prop="Templet" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="ThematicOptions" label="称呼" align="center">
                </el-table-column>
                <el-table-column prop="Name" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="vukovn" label="预约编号" align="center">
                </el-table-column>
                <el-table-column prop="Modifier" label="保险产品名称" align="center" width="150">
                </el-table-column>
                <el-table-column prop="AddTime" label="投保信息" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="回访时间" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="地址" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="下单时间" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="服务人员" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="分配人员" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="用户等待时间（天）" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Status" label="服务评价（分）" align="center" width="150">
                </el-table-column>
                <el-table-column prop="Status" label="跟进状态" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="是否下单" align="center">
                </el-table-column>
                <el-table-column prop="Status" label="分配状态" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="操作" align="center"  fixed="right" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" class="operate-search">分配</el-button>
                    <el-button type="text" class="operate-modify">跟进</el-button>
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
  name: "AppointmentOrder",
  data() {
    return {
      //顶部搜索数据
      showFlag1: true,
      title: "预约订单管理",
      startTime: "",
      endTime: "",
      status1: "",
      status2: "",
      status3: "",
      status4: "",
      status1List: [{}],
      status2List: [{}],
      status3List: [{}],
      status4List: [{}],
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

