<template>
    <div class = "feature_content">
        <page-title :title="title"></page-title>  <br>
        <div class="search">
          <span>险种分类：</span>
          <el-select class="type" v-model="type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        <el-input v-model.trim="keyword" class = "keyword"></el-input>
        <el-button type = "primary" class="ad_search" icon = "el-icon-search" @click = "search">查询</el-button>
        <el-button type = "primary" class = "search" icon =  "el-icon-plus" @click = "add">新增</el-button>
        </div>
        <div class = "product_table">
        <el-table :data = "tableData1" style = "margin-top:30px;"  border stripe height = "500">
         <el-table-column label = "所属险种分类" prop = "category" align = "center">
         </el-table-column>
         <el-table-column label = "筛选项" prop = "items" align = "center">
         </el-table-column>
         <el-table-column label = "特色标签" prop = "tag" align = "center">
         </el-table-column>
         <el-table-column label = "操作" align = "center">
            <template slot-scope="scope">
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
      <div class="popout" v-show = "popout">
        <h3>{{popoutTitle}}</h3>
        <div class = "main">
          <ul>
            <li>
              <span>所属险种分类</span>
              <el-select class="type" v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>所属险种分类</span>
              <el-select class="type" v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>筛选项</span>
              <el-select class="screen" v-model="type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </li>
            <li>
              <span>特色标签名称</span>
              <el-input></el-input>
            </li>
          </ul>
        </div>
          <el-button class = "confirm" @click = "confirm">确定</el-button>
          <el-button class = "cancel" @click = "closePop">取消</el-button>
      </div>

      <div class = "remind" v-show = "remind">
        <div class = "top">
          <h3>{{remindTitle}}</h3>
        </div>
        <div class = "main">
          <p>
            确定{{remindWords}}本次活动
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
import { Message, MessageBox } from "element-ui";
export default {
  name: "FeatureTag",
  data() {
    return {
      title:'特色标签配置',
      shadow:false,
      popout:false,
      remind:false,
      type:'',
      keyword:'',
      popoutTitle:'',
      remindTitle:'',
      remindWords:'',
      options:[

      ],
      tableData: [],
      tableData1: [
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
        },
        {
          category:'健康险',
          items:'保障项目',
          tag:'老年疾病'
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
  created() {
    this.getList();
  },
  methods: {
    getList(){

    },
    search() {
      this.$message({
        message: '查询成功',
        type: 'success'
      });
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
    openPop(){
      this.openShadow();
      this.popout = true;
    },
    closePop(){
      this.closeShadow();
      this.popout = false;
    },
    add(){
      this.popoutTitle = '新增';
      this.openPop();
    },
    modifier(){
      this.popoutTitle = '修改';
      this.openPop();
    },
    deleted(){
      this.remindTitle = "删除";
      this.remindWords = "删除";
      this.openRemind();
    },
    confirm(){

    }
  }
};
</script>

<style lang = "less">
.feature_content {
  .keyword {
    width: 200px !important;
  }

  .popout {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin:auto;
  width:360px;
  height:330px;
  background:#fff;
  border-radius: 5px;
  z-index:1000;
  h3{
    color:#aeaeae;
    text-align:center;
    height:50px;
    margin:0;
    line-height:50px;
    border-radius: 5px 5px 0 0;
    background:#333333;
  }
  .main{
    font-size:14px;
    color:#333333;
    ul{
      li{
        height:30px;
        margin:20px auto 0;
      }
    }
    .screen{
      /* margin:0 auto; */
      position:absolute;
      right:30px;
    }
    .el-select{
      height:30px !important;
      width:200px !important;
      .el-input__inner{
      height:30px !important;
      width:200px !important;
      }
    }
    .el-input{
      height:30px !important;
      width:200px !important;
      .el-input__inner{
      height:30px !important;
      width:200px !important;
      }
    }
  }
  }




}
</style>
openRemind
