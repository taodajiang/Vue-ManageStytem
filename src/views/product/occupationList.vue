<template>
    <div class = "position_content">
        <page-title :title="title"></page-title>  <br>
        <div class="search">
            <el-input v-model.trim="keyword" class = "keyword"></el-input>
            <el-button type="primary" class="searchs" icon = "el-icon-search" @click = "search">查询</el-button>
            <br/>
            <br/>
            <el-button type = "primary" class = "add" icon = "el-icon-plus" @click = "add">新增</el-button>
        </div>
        <div class = "product_table">
          <el-table :data = "tableData1" style = "margin-top:30px;"  border stripe height = "500">
         <el-table-column label = "职业表名称" prop = "name" align = "center">
         </el-table-column>
         <el-table-column label = "已关联产品" prop = "relevance" align = "center">
         </el-table-column>
         <el-table-column label = "操作" align = "center">
            <template slot-scope="scope">
              <el-button type = "text" class = "modifier" @click = "modifier">修改</el-button>
              <el-button type = "text" class = "delete" @click = "deleted">删除</el-button>
              <el-button type = "text" class = "deploy" @click = "deploy">配置</el-button>
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
            <span>职位表名称</span>
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
            <p>确定删除</p>
          </div>
          <div class = "bottom">
            <el-button type = "text" class = "confirm">确定</el-button>
            <el-button type = "text" class = "cancel" @click = "closeRemind">取消</el-button>
          </div>
        </div>
      </div>
      <div class="jobList" style = "width:100%;height:100%;position:absolute;top:0;right:0;background:#fff;" v-show = "job">
        <page-title :title="Title"></page-title>  <br>
        <el-button type = "primary" class = "add" icon = "el-icon-plus" @click = "add">添加一级</el-button>
        <div>
          <el-table :data = "tableData1" style = "margin-top:30px;"  border stripe height = "500">
            <el-table-column label = "职业名称" prop = "name" align = "center" width = "350">
            </el-table-column>
            <el-table-column label = "上级职业" prop = "name" align = "center" width = "350">
            </el-table-column>
            <el-table-column label = "类目级别" prop = "name" align = "center" width = "150">
            </el-table-column>
            <el-table-column label = "风险级别" prop = "name" align = "center" width = "150">
            </el-table-column>
            <el-table-column label = "权重排序" prop = "relevance" align = "center" width = "150">
            </el-table-column>
            <el-table-column label = "操作" align = "center">
               <template slot-scope="scope">
                 <el-button type = "text" class = "modifier" @click = "modifier">修改</el-button>
                 <el-button type = "text" class = "delete" @click = "deleted">删除</el-button>
                 <el-button type = "text" class = "deploy" @click = "deploy">添加子级</el-button>
                 <el-button type = "text" class = "deploy" @click = "deploy">添加职位</el-button>
               </template>
            </el-table-column>
          </el-table>
          <el-button type = "text" class = "confirm">保存</el-button>
          <el-button type = "text" class = "cancel" @click = "closeDeploy">取消</el-button>
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
  name: "OccupationList",
  data() {
    return {
      title:'职位表管理',
      Title:'配置职位表',
      remind:false,
      shadow:false,
      popout:false,
      job:false,
      keyword:'',
      popTitle:'',
      typeName:'',
      tableData:[],
      tableData1:[
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
        },
        {
          name:'产险职位表',
          relevance:'1'
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
    openShadow(){
      this.shadow = true;
    },
    closeShadow(){
      this.shadow = false;
    },
    openPop(){
      this.openShadow();
      this.popout = true;
    },
    closePop(){
      this.closeShadow();
      this.popout = false;
    },
    closeRemind(){
      this.closeShadow();
      this.remind = false;
    },
    add(){
      this.popTitle = "新增";
      this.openPop();
    },
    modifier(){
      this.popTitle = "修改";
      this.openPop();
    },
    confirm(){

    },
    search(){
      this.$message({
        message: '查询成功',
        type: 'success'
      });
    },
    deleted(){
      this.openPop();
      this.remind = true;
    },
    deploy(){
      this.job = true;
    },
    closeDeploy(){
      this.job = false;
    }
  }
};
</script>

<style lang = "less">
  .position_content{
      .search{
        position:relative;
        .keyword{
            width:200px !important;
          }
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

    .jobList{
      .confirm,.cancel{
        width:120px;
        height:36px;
        line-height:18px;
        font-size:18px;
        border-radius: 18px;
        position:absolute;
        bottom:200px;
      }
      .confirm{
        background:#cdb27e;
        color:#5b4e35;
        left:600px;
        border:none;
      }
      .cancel{
        background:#fff;
        right:800px;
        color:#c3b382;
        border:1px solid #c6b78b;
      }
    }

  }
</style>
