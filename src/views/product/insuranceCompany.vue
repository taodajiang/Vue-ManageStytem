<template>
    <div class = "company_content">
        <page-title :title="title"></page-title>  <br>
        <el-button type = "primary" icon = "el-icon-plus" @click = "add">新增</el-button>
        <el-input v-model.trim="keyword" class = "keyword"></el-input>
        <el-button type="primary" class="ad_search" icon = "el-icon-search" @click = "search">查询</el-button>
        <div class = "product_table">
        <el-table :data = "tableData1" style = "margin-top:30px;"  border stripe height = "500">
        <el-table-column type = "index" label="序号" align="center" width = "50px">
        </el-table-column>
        <el-table-column label = "公司全称" prop = "fullName" align = "center">
        </el-table-column>
        <el-table-column label = "公司简称" prop = "shortName" align = "center">
        </el-table-column>
        <el-table-column label = "车险" prop = "insur" align = "center">
        </el-table-column>
        <el-table-column label = "非车险" prop = "noInsur" align = "center">
        </el-table-column>
        <el-table-column label = "图标" prop = "icon" align = "center">
          <template slot-scope="scope">
              <img :src="scope.row.icon" width="40" height="40" class="head_pic"/>
              <img :src="scope.row.pic" width="40" height="40" class="head_pic"/>
          </template>
        </el-table-column>
        <el-table-column label = "操作" align = "center">
          <template slot-scope="scope">
            <el-button type = "text" class = "modifier" @click = "modifier">修改</el-button>
            <el-button type = "text" class = "check" @click = "check">查看</el-button>
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
          <div class = "top">
            <h3>{{popTitle}}</h3>
          </div>
          <br/>
          <div class = "inner">
          <el-input type ="text" placeholder = "请输入公司名称">
            <template slot="prepend">公司名称</template>
          </el-input>
          <el-input type ="text" placeholder = "请输入公司简称">
            <template slot="prepend">公司简称</template>
          </el-input>
          <br/>
          <br/>
          <el-input type ="text" placeholder = "请输入公司网址">
            <template slot="prepend">公司网址</template>
          </el-input>
          <el-input type ="text" placeholder = "请输入报案电话">
            <template slot="prepend">报案电话</template>
          </el-input>
          <br/>
          <br/>
          <el-input type ="text" placeholder = "请输入公司地址">
            <template slot="prepend">公司地址</template>
          </el-input>
          <el-input type ="text" placeholder = "请输入排序权重">
            <template slot="prepend">排序权重</template>
          </el-input>
          <br/>
          <br/>
          <span class = "describe">公司简介</span>
          <el-input type="textarea" :rows="6" placeholder="请输入公司简介">
            <template slot="prepend">公司简介</template>
          </el-input>
          <span>正方形图标</span>
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeUpload" :on-change="changeFile" v-model="fileData" accept="image/*">
              <img id="giftImg" :src="imageUrl" class="avatar" alt="" style = "width:50px;height:50px;">
              <el-button slot="trigger" size="small" type="primary" class="upload">上传图片</el-button>
    <!-- <img id="giftImg" v-if="imageUrl" :src="imageUrl" class="avatar"> -->

<!-- <el-button v-else slot="trigger" size="small" type="primary" class="upload">{{pic}}</el-button> -->
          </el-upload>
          <br/>
          <span>长方形图标</span>
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="beforeUpload" :on-change="changefile" v-model="filedata" accept="image/*">
              <img id="giftImg" :src="imageurl" class="avatar" alt="" style = "width:100px;height:50px;">
              <el-button slot="trigger" size="small" type="primary" class="upload">上传图片</el-button>
          </el-upload>
          <br/>
          <el-button type = "text" class = "confirm">保存</el-button>
          <el-button type = "text" class = "cancel" @click = "closePop">取消</el-button>
        </div>
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
  name: "InsuranceCompany",
  data() {
    return {
      title:'保险公司配置',
      popout:false,
      shadow:false,
      remind:false,
      popTitle:'',
      keyword:'',
      fileData:'',
      imageUrl:'',
      filedata:'',
      imageurl:'',
      tableData:[],
      tableData1:[
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
        },
        {
          fullName:'肯德基',
          shortName:'kfc',
          insur:'已开通',
          noInsur:'未开通',
          icon:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png',
          pic:'https://sta.maodou.com/xinche_web/static/images/app-qrcode.ae4f84e7.png'
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
    openRemind(){
      this.openShadow();
      this.remind = true;
    },
    closeRemind(){
      this.closeShadow();
      this.remind = false;
    },
    openPop(){
      this.openShadow(),
      this.popout = true;
    },
    closePop(){
      this.closeShadow();
      this.popout = false;
    },
    search(){
      this.$message({
        message: '查询成功',
        type: 'success'
      });
    },
    add(){
      this.popTitle = "新增";
      this.openPop();
    },
    check(){
      this.popTitle = "查看";
      this.openPop();
    },
    modifier(){
      this.popTitle = "修改";
      this.openPop();
    },
    deleted(){
      this.openRemind();
    },
    beforeUpload(){

    },
    changeFile(file, fileList) {
    let that = this;
    let reader = new FileReader();
    reader.readAsDataURL(file.raw);
    reader.onload = function (e) {
        that.imageUrl = this.result;
        that.fileData = this.result;
        // console.log(that.fileData);
    }
},
changefile(file, fileList) {
let that = this;
let reader = new FileReader();
reader.readAsDataURL(file.raw);
reader.onload = function (e) {
    that.imageurl = this.result;
    that.filedata = this.result;
    // console.log(that.fileData);
}
}
  }
};
</script>

<style lang = "less">
  .company_content{
    .keyword{
      width:200px !important;
    }
    .popout {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin:auto;
    width:800px;
    height:600px;
    background:#fff;
    border-radius: 5px;
    z-index:1000;
    /* border:1px solid red; */
    h3{
      color:#aeaeae;
      text-align:center;
      height:50px;
      margin:0;
      line-height:50px;
      border-radius: 5px 5px 0 0;
      background:#333333;
    }
    .inner{
      width:600px;
      margin:0 auto;
    }
    .describe{
      width:100px;
      height:30px;
      /* border:1px solid red; */
      background:#FBFBFB;
    }
    .el-input{
      width:200px !important;
      height:30px !important;
      .el-input__inner{
        width:200px !important;
        height:30px !important;
      }
    }
    .confirm{
      left:250px;
    }
    .cancel{
      right:250px;
    }
  }

  }
</style>
