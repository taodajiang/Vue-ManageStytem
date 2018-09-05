<template>
<div class="rolemanage">
    <pageTitle :title="title"></pageTitle>
    <div class="content">
        <div class="content_left">
            <el-input v-model="keyword" placeholder="输入关键字进行搜索" class="keyWord" suffix-icon="el-icon-search">
            </el-input>
            <button class="search el-icon-search"></button>
            <ul class="roleList">
                <li class="listItem" v-for="(item, i) in roleList" :key="i">
                    <span class="textBtn">{{item.RoleName}}</span>
                    <span class="modifyBtn" @click="modifyClick">修改</span>
                    <span class="delBtn" @click="delClick">删除</span>
                </li>
            </ul>
            <el-button plain class="addRole" @click="addClick"><i class="el-icon-plus"></i>新增</el-button>
        </div>

        <div class="content_right">
            <span class="roleName">角色名称:{{subTitle}}</span>
            <div class="export_list">
                <div class="roleTitle">网络管理</div>
                <div class="export_item" v-for="(item,index) in modelList" :key="index" :class="index%2==0?'oddItem':'evenItem'">
                    <span class="item_title">{{item.Name}}</span>
                    <el-checkbox-group class="item_checkboxs" v-model="checkList">
                        <el-checkbox v-for="(item,i) in item.Children" :key="i" :label="item.ID">{{item.FunctionName}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <el-button plain class="save" type="warning"><i class="el-icon-check"></i>保存</el-button>
        </div>
    </div>
    <!-- 新增弹框 -->
    <div class="addRoleBox" v-show="showFlag">
        <div class="addBox">
            <h3>{{boxTitle}}</h3>
            <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="form" :label-position="labelPosition">
                <el-form-item label="角色名称" prop="RoleName" class="item">
                    <el-input v-model="ruleForm.roleName"></el-input>
                </el-form-item>
                <el-form-item class="item">
                    <el-button type="primary" @click="addConfirm">确定</el-button>
                    <el-button @click="addCancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

    <!-- 删除弹框 -->
    <div class="detela" v-show="showFlag1">
        <div class="detelaBox">
            <h3>提示</h3>
            <div class="tips">
                <span>是否确定删除?</span>
            </div>
            <div class="detelaBtn">
              <el-button type="primary" @click="delConfirm">确定</el-button>
              <el-button @click="delCancel">取消</el-button>
            </div>
            
        </div>
    </div>
</div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import global from "../../Global.js";
import { mapGetters } from "vuex";
export default {
  name: "RoleManage",
  components: { PageTitle },
  data() {
    return {
      //角色名称列表数据
      title: "角色管理",
      keyword: "",
      roleList: [
        {
          id: 1,
          RoleName: "大牛"
        },
        {
          id: 2,
          RoleName: "二牛"
        }
      ],
      //角色权限列表
      subTitle: "大牛",
      checkList: "",
      modelList: [
        {
          id: 1,
          Name: "大熊",
          Children: [
            {
              ID: 1,
              FunctionName: "嘿嘿"
            },
            {
              ID: 2,
              FunctionName: "哈哈"
            }
          ]
        },
        {
          id: 2,
          Name: "二熊",
          Children: [
            {
              ID: 1,
              FunctionName: "嘻嘻"
            },
            {
              ID: 2,
              FunctionName: "呵呵"
            }
          ]
        }
      ],
      //新增弹框
      showFlag: false,
      boxTitle: "",
      ruleForm: {
        roleName: ""
      },
      rules: {
        RoleName: [
          { required: true, message: "请输入机构名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      labelPosition: "right",
      //删除弹框
      showFlag1: false
    };
  },
  methods: {
    addClick() {
      this.showFlag = true;
      this.boxTitle = "新增角色";
    },
    modifyClick() {
      this.showFlag = true;
      this.boxTitle = "修改角色";
    },
    addConfirm() {
      this.showFlag = false;
    },
    addCancel() {
      this.showFlag = false;
    },
    delClick() {
      this.showFlag1 = true;
    },
    delConfirm() {
      this.showFlag1 = false;
    },
    delCancel() {
      this.showFlag1 = false;
    }
  }
};
</script>

<style lang="less" scoped>
.rolemanage {
  position: relative;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  .content {
    width: 100%;
    display: flex;
    .content_left {
      position: relative;
      height: 500px;
      flex: 0 0 400px;
      margin-right: 50px;
      padding: 30px;
      border: 1px solid #d6dce2;
      background: #fff;
      .search {
        display: block;
        width: 30px;
        height: 40px;
        background-color: #bcaa72;
        border: 0;
        border-radius: 3px;
        position: absolute;
        top: 30px;
        right: 31px;
        cursor: pointer;
      }
      .roleList {
        height: 90%;
        margin-top: 20px;
        overflow: auto;
        .listItem {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          margin: 5px 0;
          cursor: pointer;
          .active {
            background-color: #bcaa72;
          }
          .delBtn {
            color: #e96e6e;
            float: right;
            margin-right: 20px;
          }
          .modifyBtn {
            color: #bcaa72;
            float: right;
          }
        }
      }
      .addRole {
        position: absolute;
        bottom: -60px;
        right: 20px;
        color: #fff;
        background-color: #c3b382;
      }
    }
    .content_right {
      position: relative;
      flex: 1;
      .export_list {
        margin-top: 20px;
        .roleTitle {
          background: #ded8c6;
          line-height: 40px;
          font-size: 14px;
          padding-left: 50px;
        }
        .oddItem {
          background: #fff;
        }
        .evenItem {
          background: #ececec;
        }
        .export_item {
          display: flex;
          height: 40px;
          color: #14151d;
          font-size: 14px;
          line-height: 40px;
          padding-left: 50px;
          .item_title {
            flex: 0 0 100px;
          }
          .item_checkboxs {
            justify-content: flex-start;
            margin: 0px 20px;
            font-size: 14px;
          }
        }
      }
      .save {
        position: absolute;
        bottom: -60px;
        right: 20px;
        color: #fff;
        background-color: #c3b382;
      }
    }
  }
  .addRoleBox {
    display: inline-block;
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
      top: 45%;
      transform: translate(-50%, -50%);
      width: 488px;
      background-color: #fff;
      border-radius: 10px;
      h3 {
        display: block;
        height: 80px;
        line-height: 120px;
        text-align: center;
        //background: url(../../assets/img/tc_bg2.png) no-repeat;
        background-size: 488px 120px;
        margin: 0px;
      }
      .form {
        margin-top: 20px;
        .item {
          width: 400px;
          margin: 50px 0;
          .el-button {
            width: 100px;
            border-radius: 30px;
            margin: 0 20px;
          }
        }
        .el-input {
          width: 300px !important;
        }
      }
    }
  }
  .detela {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    text-align: center;
    .detelaBox {
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
      .detelaBtn {
        .el-button {
          margin: 0px 20px;
        }
      }
    }
  }
}
</style>
