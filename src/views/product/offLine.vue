<template>
    <div class = "offline_content">
        <page-title :title="title"></page-title>  <br>
        <div class="search">
        <span>保险类型：</span>
        <el-select class="SiteID" v-model="type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
        <span>修改时间：</span>
        <el-date-picker
      v-model="beginTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    <el-date-picker
      v-model="endTime"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
         <el-input v-model.trim="keyword" class = "keyword"></el-input>
         <el-button type="primary" class="ad_search" icon = "el-icon-search" @click = "search">查询</el-button>
      </div>
             <el-button type = "primary" icon = "el-icon-plus" @click = "add">新增</el-button>
             <div class = "product_table">
        <el-table :data = "tableData1" style = "margin-top:30px;"  border stripe height = "500">
         <el-table-column type = "index" label="序号" align="center"  width = "50px">
         </el-table-column>
         <el-table-column label = "产品编号" prop = "number" align = "center">
         </el-table-column>
         <el-table-column label = "保险类型" prop = "type" align = "center">
         </el-table-column>
         <el-table-column label = "保险公司" prop = "company" align = "center">
         </el-table-column>
         <el-table-column label = "保险名称" prop = "name" align = "center">
         </el-table-column>
         <el-table-column label = "修改人" prop = "user" align = "center">
         </el-table-column>
         <el-table-column label = "修改时间" prop = "time" align = "center">
         </el-table-column>
         <el-table-column label = "状态" prop = "status" align = "center">
         </el-table-column>
         <el-table-column label = "操作" align = "center">
            <template slot-scope="scope">
              <el-button type = "text" class = "putaway" @click = "putaway">上架</el-button>
              <el-button type = "text" class = "extend" @click = "extend">扩展</el-button>
              <el-button type = "text" class = "calculate" @click = "calculate">算价</el-button>
              <el-button type = "text" class = "check" @click = "check">查看</el-button>
              <el-button type = "text" class = "modifier" @click = "modifier">修改</el-button>
              <el-button type = "text" class = "edition" @click = "edition">版本</el-button>
              <el-button type = "text" class = "soldout" @click = "soldout">下架</el-button>
              <el-button type = "text" class = "copylink" @click ="copylink">复制链接</el-button>
            </template>
         </el-table-column>
       </el-table>
       </div>
       <div>
        <pagination :paginationData="paginationData"></pagination>
      </div>

      <div class = "shade" v-show = "shadow">
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

      <div class="version" v-show = "version">
        <div class="top">
          <h3>版本管理</h3>
          <i class = "el-icon-close" @click = "closeEdition"></i>
        </div>

          <el-table :data = "tableData3" border stripe>
            <el-table-column prop = "editionNo" label = "版本号" align = "center">
            </el-table-column>
            <el-table-column prop = "createTime" label = "创建时间" align = "center">
            </el-table-column>
          </el-table>
      </div>

      <div class="calculated" v-show = "calculation">
        <div class="top">
          <h3>算价规则</h3>
        </div>
        <el-table :data = "tableData2" border stripe height = "300">
          <el-table-column label = "计划" prop = "plan" align = "center"></el-table-column>
          <el-table-column label = "名称" prop = "insuranceName" align = "center"></el-table-column>
          <el-table-column label = "是否设置成功" prop = "isSet" align = "center"></el-table-column>
          <el-table-column label = "操作" align = "center">
            <template slot-scope = "scope">
              <el-button type = "text" class = "putaway" @click = "configuration">规则配置</el-button>
              <el-button type = "text" class = "extend" @click = "coverage">保额区间</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type = "text" class = "back" @click = "closeCalcuate">返回</el-button>
      </div>

      <div class="coverage" v-show = "coveraged">
        <div class="top">
          <h3>保额区间配置</h3>
        </div>
        <span>默认值：</span>
        <el-input type = "text"></el-input>
        <span>最小值：</span>
        <el-input type = "text"></el-input>
        <span>保额：</span>
        <el-input type = "text"></el-input>
        <span>-</span>
        <el-input type = "text"></el-input>
        <span>增加保费（元）：</span>
        <el-input type = "text"></el-input>

        <el-button type = "text" class = "putaway" @click = "configuration">保存</el-button>
        <el-button type = "text" class = "extend" @click = "coverage">取消保额区间</el-button>
        <el-button type = "text" class = "back" @click = "closeCoverage">返回</el-button>
      </div>

      <div class="configuration" v-show = "configurable">
        <div class="top">
          <h3>保障计划</h3>
        </div>
        <el-button type= "text">主险</el-button>
        <el-button type= "text" class = "back" @click = "closeConfiguration">返回</el-button>
        <el-button type = "text" class = "add" @click = "addFactor">新增因子</el-button>
        <el-table :data = "tableData4" border stripe height = "300">
          <el-table-column type = "index" label = "序号" align = "center"></el-table-column>
          <el-table-column prop = "factorName" label = "因子名称" align = "center"></el-table-column>
          <el-table-column prop = "factorDefault" label = "默认值" align = "center"></el-table-column>
          <el-table-column prop = "factorType" label = "类型" align = "center"></el-table-column>
          <el-table-column prop = "factorSubitem" label = "子项" align = "center"></el-table-column>
          <el-table-column prop = "factorUnit" label = "单位" align = "center"></el-table-column>
          <el-table-column prop = "factorLevel" label = "级别" align = "center"></el-table-column>
          <el-table-column label = "操作" align = "center">
            <template slot-scope = "scope">
              <el-button type = "text" class = "putaway" @click = "configuration">查看</el-button>
              <el-button type = "text" class = "extend" @click = "coverage">修改</el-button>
              <el-button type = "text" class = "extend" @click = "coverage">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type = "text">下载价格表模板</el-button>
        <el-button type = "text">上传价格表</el-button>
      </div>

      <div class="addFactor" v-show = "factor">
        <div class="top">
          <h3>新增因子</h3>
        </div>
        <ul>
        <span>名称</span>
        <el-input type = "text"></el-input>
        <span>类型</span>
        <el-select class="SiteID" v-model="factorType" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>默认值</span>
        <el-input type = "text"></el-input>
        <span>单位</span>
        <el-input type = "text"></el-input>
        <div v-if = "factorType == '1' ">
          <span>子项</span>
          <el-input type = "text" ></el-input>
        </div>
        <div v-else>
          <span>年龄</span>
          <el-input type = "text"></el-input>
          <span>-</span>
          <el-input type = "text"></el-input>
        </div>
        <span>排序</span>
        <el-select class="SiteID" v-model="factorOrder" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </ul>
      </div>

      <div class="addBox" v-show = "added">
        <div class="top"></div>
        <ul>
          <li>
            <span>保险名称</span>
            <el-input size = "small"></el-input>
          </li>
          <li>
            <span>产品介绍</span>
            <el-input size = "small"></el-input>
          </li>
          <li>
            <span>详情页宣传句</span>
            <el-input size = "small"></el-input>
            <el-input size = "small"></el-input>
            <el-input size = "small"></el-input>
            <el-input size = "small"></el-input>
          </li>
          <li>
            <span>产品图片</span>
          </li>
          <li>
            <span>保险简称</span>
            <span>职业表</span>
            <el-input size = "small"></el-input>
          </li>
          <li>
            <span>保险公司</span>
          </li>
          <li>
            <span>虚拟销量</span>
            <el-input size = "small"></el-input>
          </li>
          <li>
            <span>险种分类</span>
          </li>
          <li>
            <span>列表宣传语</span>
            <el-input size = "small"></el-input>
            <el-input size = "small"></el-input>
            <el-input size = "small"></el-input>
          </li>
          <li>
            <span>险种二级分类</span>
          </li>
          <li>
            <span>限购份数</span>
          </li>
          <li>
            <span>犹豫期（天）</span>
            <el-input size = "small"></el-input>
          </li>
          <li>
            <span>选择特色标签</span>
            <el-button type = "button">点击选取</el-button>
          </li>
          <li>
            <span>保险条款</span>
          </li>
          <li>
            <span>条款名称</span>
            <el-input size = "small"></el-input>
            <el-button type = "button">上传</el-button>
          </li>
          <li>
            <span>健康告知</span>
            <el-button type = "button">上传</el-button>
          </li>
          <li>
            <span>投保声明</span>
          </li>
          <li>
            <span>条款名称</span>
            <el-input size = "small"></el-input>
            <el-button type = "button">上传</el-button>
          </li>
          <li>
            <span>上架时间</span>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <span>下架时间</span>
            <el-date-picker
              v-model="endTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <el-button @click = "nextStep">下一步</el-button>
        </ul>
      </div>

      <div class="planBox" v-show = "planed">
        <div class="top"></div>
        <el-button type = "primary" icon = "el-icon-plus">新增</el-button>
        <el-table>
          <el-table-column prop = "editionNo" label = "排序" align = "center"></el-table-column>
          <el-table-column prop = "editionNo" label = "名称" align = "center"></el-table-column>
          <el-table-column label = "操作" align = "center">
             <template slot-scope="scope">
               <el-button type = "text" class = "putaway" @click = "putaway">查看</el-button>
               <el-button type = "text" class = "extend" @click = "extend">修改</el-button>
               <el-button type = "text" class = "extend" @click = "extend">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
        <el-button type = "primary" @click = "lastStep">上一步</el-button>
        <el-button type = "primary" @click = "finish">完成</el-button>
      </div>

      <div class="finish" v-show = "finished">
        <div class="top"></div>
        <h3>已创建好保险产品，去填写更多扩展信息</h3>
        <el-button type = "text" class = "confirmBtn">扩展信息</el-button>
        <el-button type = "text" class = "cancelBtn" @click = "back">返回</el-button>
      </div>

      <div class="addPlan" v-show = "plant">
        <div class="top">
          <h3>新增保障计划</h3>
        </div>
        <ul>
        <span>选择计划</span>
        <el-select class="insurtype" v-model="choicePlan" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br/>
        <span>计划名称</span>
        <el-input type = "text"></el-input>
        <span>起投金额</span>
        <el-input type = "text"></el-input>元起
        <span>投保年龄</span>
        <el-input type = "text"></el-input>
        <el-select class="insurtype" v-model="insurAge" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span>保障期限</span>
        <el-input type = "text"></el-input>年-
        <el-input type = "text"></el-input>年
        <span>保障名称</span>
        <el-input type = "text"></el-input>
        <span>保障金额</span>
        <el-input type = "text"></el-input>
        <span>保障说明</span>
        <el-input type = "text"></el-input>
        <el-table>
          <el-table-column prop = "" label = "名称" align = "center"></el-table-column>
          <el-table-column prop = "" label = "金额" align = "center"></el-table-column>
          <el-table-column prop = "" label = "说明" align = "center"></el-table-column>
          <el-table-column label = "操作" align = "center">
             <template slot-scope="scope">
               <el-button type = "text" class = "extend" @click = "extend">修改</el-button>
               <el-button type = "text" class = "extend" @click = "extend">删除</el-button>
             </template>
          </el-table-column>
        </el-table>
      </ul>
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
  name: "OffLine",
  data() {
    return {
      title:'线下产品管理',
      shadow:false,
      remind:false,
      calculation:false,
      version:false,
      coveraged:false,
      configurable:false,
      factor:false,

      added:false,
      finished:false,
      planed:false,
      plant:false,
      remindTitle:'',
      remindWords:'',
      type:0,
      beginTime:new Date(),
      endTime:new Date(),
      keyword:'',
      popTitle:'',
      factorType:'',
      factorOrder:'',
      insurtype:0,
      insurAge:0,
      choicePlan:0,
      options:[
        {
          value:0,
          label:'全部'
        },
        {
          value:1,
          label:'一级分类'
        },
        {
          value:2,
          label:'二级分类'
        }
      ],
      options1:[
        {
          value:0,
          label:'自定义多选项'
        },
        {
          value:1,
          label:'年龄'
        }
      ],
      options2:[
        {
          value:0,
          label:'一级'
        },
        {
          value:1,
          label:'二级'
        },
        {
          value:2,
          label:'三级'
        },
        {
          value:3,
          label:'四级'
        },
        {
          value:4,
          label:'五级'
        },
        {
          value:5,
          label:'六级'
        },
        {
          value:6,
          label:'七级'
        },
        {
          value:7,
          label:'八级'
        },
        {
          value:8,
          label:'九级'
        }
      ],
      tableData:[],
      tableData1:[
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        },
        {
          number:1,
          type:"666",
          company:'666',
          name:'666',
          plan:'666',
          user:'666',
          time:'666',
          status:'666'
        }
      ],
      tableData2:[
        {
          plan:'hehe',
          insuranceName:'hehe',
          isSet:'hehe'
        },
        {
          plan:'hehe',
          insuranceName:'hehe',
          isSet:'hehe'
        },
        {
          plan:'hehe',
          insuranceName:'hehe',
          isSet:'hehe'
        },
        {
          plan:'hehe',
          insuranceName:'hehe',
          isSet:'hehe'
        },
        {
          plan:'hehe',
          insuranceName:'hehe',
          isSet:'hehe'
        }
      ],
      tableData3:[
        {
          editionNo:'1',
          crateTime:'1'
        },
        {
          editionNo:'1',
          crateTime:'1'
        }
      ],
      tableData4:[
        {
          factorName:'666',
          factorDefault:'666',
          factorType:'666',
          factorSubitem:'666',
          factorUnit:'666',
          factorLevel:'666'
        },
        {
          factorName:'666',
          factorDefault:'666',
          factorType:'666',
          factorSubitem:'666',
          factorUnit:'666',
          factorLevel:'666'
        },
        {
          factorName:'666',
          factorDefault:'666',
          factorType:'666',
          factorSubitem:'666',
          factorUnit:'666',
          factorLevel:'666'
        },
        {
          factorName:'666',
          factorDefault:'666',
          factorType:'666',
          factorSubitem:'666',
          factorUnit:'666',
          factorLevel:'666'
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
    add(){
      this.openShadow();
      this.added = true;
    },
    search(){
      this.$message({
        message: '查询成功',
        type: 'success'
      });
    },
    openRemind(){
      this.remind = true;
    },
    closeRemind(){
      this.remind = false;
      this.closeShadow();
    },
    openShadow(){
      this.shadow = true;
    },
    closeShadow(){
      this.shadow = false;
    },
    putaway(){
      this.openShadow();
      this.remindTitle = '上架';
      this.remindWords = '上架';
      this.openRemind();
    },
    extend(){

    },
    calculate(){
      this.openShadow();
      this.calculation = true;
    },
    closeCalcuate(){
      this.closeShadow();
      this.calculation = false;
    },
    soldout(){
      this.openShadow();
      this.remindTitle = '下架';
      this.remindWords = '下架';
      this.openRemind();
    },
    check(){

    },
    modifier(){

    },
    nextStep(){
      this.added = false;
      this.planed = true;
    },
    lastStep(){
      this.planed = false;
      this.added = true;
    },
    finish(){
      this.planed = false;
      this.finished = true;
    },
    back(){
      this.closeShadow();
      this.finished = false;
    },
    edition(){
      this.openShadow();
      this.version = true;
    },
    closeEdition(){
      this.closeShadow(),
      this.version = false;
    },
    copylink(){
      this.$message({
        message: '链接复制成功',
        type: 'success'
      });
    },
    coverage(){
      this.openShadow();
      this.coveraged = true;
    },
    closeCoverage(){
      this.closeShadow();
      this.coveraged = false;
    },
    configuration(){
      this.openShadow();
      this.configurable = true;
    },
    closeConfiguration(){
      this.closeShadow();
      this.configurable = false;
    },
    addFactor(){

    }
  }
};
</script>

<style lang = "less">
  .offline_content{
    .keyword{
      width:200px !important;
    }

    .top{
      h3{
        color:#aeaeae;
        text-align:center;
        height:50px;
        margin:0;
        line-height:50px;
        border-radius: 5px 5px 0 0;
        background:#333333;
      }
      i{
         position:absolute;
         right:10px;
         top:15px;
         color:#fff;
         cursor:pointer;
      }
    }
    .calculated,.version,.coverage,.configuration,.addFactor,.addBox,.planBox,.finish{
      position:fixed;
      left:0;
      right:0;
      top:0;
      bottom:0;
      margin:auto;
      background:#ffffff;
      z-index:1000;
      border-radius:5px;
    }
    .addBox{
      width:1000px;
      max-height:900px;
      overflow-y: auto;
      .top{
        width:1000px;
        height:100px;
        background:url('../../assets/images/process1.png') no-repeat center;
      }
      li{
        margin-bottom:10px;
      }
      .el-input,.el-input__inner{
        width:200px !important;
        height:30px !important;
      }
    }
    .extendBox{
       width:1592px;
       height:800px;
    }
    .planBox{
      width:1000px;
      height:400px;
      .top{
        width:1000px;
        height:100px;
        background:url('../../assets/images/process2.png') no-repeat center;
      }
    }
    .finish{
      width:1000px;
      height:500px;
      text-align:center;
      .top{
        width:1000px;
        height:100px;
        background:url('../../assets/images/process3.png') no-repeat center;
      }
      h3{
        margin-top:100px;
      }
    }
    .calculated{
       width:80%;
       height:50%;
    }
    .version{
       width:600px;
       height:256px;
    }
    .coverage{
       width:50%;
       height:50%;
    }
    .configuration{
      width:80%;
      height:50%;
    }
    .addFactor{
      width:800px;
      height:350px;
    }
    .back{
      position:absolute;
      left:0;
      right:0;
      bottom:50px;
      margin:0 auto;
      width:120px;
      height:36px;
      border-radius:18px;
      background:#cdb27e;
      color:#fff;
    }


  }
</style>
