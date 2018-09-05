<template>
    <div class = "type_content">
        <page-title :title="title"></page-title>  <br>
        <el-button type = "primary" icon = "el-icon-plus" @click = "add">新增一级</el-button>
        <el-input v-model.trim="keyword" class = "keyword"></el-input>
        <el-button type="primary" class="ad_search" @click = "search" icon = "el-icon-search">查询</el-button>
        <div class = "product_table">
        <el-table :data = "tableData1" style = "margin-top:30px;"  border stripe height = "500">
         <el-table-column type = "index" label="序号" align="center"  width = "50px">
         </el-table-column>
         <el-table-column label = "保险类型名称" prop = "name" align = "center">
         </el-table-column>
         <el-table-column label = "关联上级" prop = "relevance" align = "center">
         </el-table-column>
         <el-table-column label = "修改人" prop = "user" align = "center">
         </el-table-column>
         <el-table-column label = "修改时间" prop = "time" align = "center">
         </el-table-column>
         <el-table-column label = "操作" align = "center">
            <template slot-scope="scope">
              <el-button type = "text" class = "create" @click = "create">创建子集</el-button>
              <el-button type = "text" class = "modifier" @click = "modifier">修改</el-button>
              <el-button type = "text" class = "delete" @click = "deleted">删除</el-button>
            </template>
         </el-table-column>
       </el-table>
       </div>
       <div>
        <pagination :paginationData="paginationData"></pagination>
      </div>
      <div class = "shade" v-show = "shadow">
        <div class = "popout" v-show = "popout">
          <h3>{{popTitle}}</h3>
          <div class = "main">
            <span>类型名称</span>
            <el-input v-model.trim= "typeName"></el-input>
          </div>
          <el-button class = "confirm" @click = "confirm">确定</el-button>
          <el-button class = "cancel" @click = "closePop">取消</el-button>
        </div>

        <div class = "remind" v-show = "remind">
          <div class = "top">
            <h3>删除</h3>
          </div>
          <div class = "main">
            <p>
              确定删除本次活动
            </p>
          </div>
          <div class = "bottom">
            <el-button type = "text" class = "confirm">确定</el-button>
            <el-button type = "text" class = "cancel" @click = "closeRemind">取消</el-button>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import Pagination from "../../components/Pagination";
import global from "../../Global.js";
import axios from "axios";
import { Message,MessageBox } from 'element-ui';
export default {
  name: "InsuranceType",
  data() {
    return {
      title:'保险类型配置',
      popout:false,
      delet:false,
      shadow:false,
      remind:false,
      popTitle:'',
      keyword:'',
      typeName:'',
      tableData:[],
      tableData1:[
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        },
        {
          name:'随便',
          relevance:'1',
          user:'张三',
          time:'2018-07-31'
        }
      ],
      paginationData: {
        total: 100,
        pageSizes: [10, 20, 50],
        pageSize: 10,
        currentPage: 1,
        handleSizeChange: val => {
          this.paginationData.currentPage = 1;
          this.paginationData.pageSize = val;
        },
        handleCurrentChange: val => {
          this.currentPage = val;
          this.paginationData.currentPage = val;
        }
      }
    };
  },
  components: {
    PageTitle,
    Pagination
  },
  created(){
    this.getList();
  },
  methods:{
    getList(){

    },
    openPop(){
      this.popout = true;
      this.shadow = true
    },
    closePop(){
      this.popout = false;
      this.shadow = false;
      this.typeName = '';
    },
    openRemind(){
      this.openShadow();
      this.remind = true;
    },
    closeRemind(){
      this.closeShadow();
      this.remind = false;
    },
    openShadow(){
      this.shadow = true;
    },
    closeShadow(){
      this.shadow = false;
    },
    confirm(){
      alert(this.typeName)
    },
    add(){
      this.popTitle = '新增一级';
      this.openPop();
    },
    search(){
      this.$message({
        message: '查询成功',
        type: 'success'
      });
    },
    getList(){

    },
    create(){
      this.popTitle = '创建子集';
      this.openPop();
    },
    modifier(){
      this.popTitle = '修改';
      this.openPop();
    },
    deleted(){
      this.openRemind();
    }
  }
};
</script>

<style lang = "less">
  .type_content{
    .keyword{
      width:200px !important;
    }

    .popout{
      position:fixed;
      width:360px;
      height:200px;
      border-radius: 5px;
      left:0;
      right:0;
      top:0;
      bottom:0;
      margin:auto;
      background:#fff;
      h3{
        color:#aeaeae;
        text-align:center;
        height:50px;
        margin:0;
        line-height:50px;
        border-radius: 5px;
        background:#333333;
      }
      .main{
        width:360px;
        height:90px;
        position:relative;
        span{
          position:absolute;
          top:28px;
          left:40px;
          font-size:14px;
        }
        .el-input{
          position:absolute;
          width:195px !important;
          height:30px !important;
          top:24px;
          left:115px;
          .el-input__inner{
            width:195px !important;
            height:30px !important;
          }
        }
      }
    }

  }
</style>
