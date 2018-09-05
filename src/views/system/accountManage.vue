<template>
    <div>
        <page-title :title="title"></page-title>  <br>
        <div class="head">
          <div class="search">
              <el-input v-model="searchWord" placeholder="姓名/部门" class="staffName" style="width:300px"></el-input>
              <el-button type="primary" size="small" @click="search">查询</el-button>
          </div>
          <div class="operate">
              <el-button type="primary" @click="add" size="small">新增</el-button>
          </div>
        </div>
        <div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="temp" label="姓名" align="center">
                </el-table-column>
                <el-table-column prop="topic" label="用户名" align="center">
                </el-table-column>
                <el-table-column prop="topicTitle" label="手机号" align="center">
                </el-table-column>
                <el-table-column prop="productNum" label="机构" align="center">
                </el-table-column>
                <el-table-column prop="modifier" label="角色" align="center">
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                </el-table-column>
                <el-table-column prop="remark" label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" class="operate-search" @click="check">查看</el-button>
                    <el-button type="text" class="operate-modify" @click="modify">修改</el-button>
                    <el-button type="text" class="operate-del" @click="remove">删除</el-button>
                    <el-button type="text" class="operate-rests" @click="reset">重置密码</el-button>
                  </template>
                </el-table-column>              
              </el-table>
        </div>
        <div class="message_pagination">
            <pagination :paginationData="paginationData"></pagination>
        </div>
        
        <!-- 新增/修改弹窗 -->
        <div class="addStaff" v-show="showFlag1">
            <div class="addStaffBox">
                <h3>{{boxTitle}}</h3>
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="form" :label-position="labelPosition">
                    <el-form-item label="用户名" prop="userName" class="item">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="staffName" class="item">
                        <el-input v-model="ruleForm.staffName"></el-input>
                    </el-form-item>
                    <el-form-item label="员工手机号" prop="mobile" class="item">
                      <el-input v-model="ruleForm.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="机构" prop="organ" class="item">
                      <el-select v-model="ruleForm.organ" class="item">
                        <el-option v-for="item of organList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex" class="item">
                       <el-radio-group v-model="ruleForm.sex">
                          <el-radio label="1">男</el-radio>
                          <el-radio label="2">女</el-radio>
                       </el-radio-group>
                    </el-form-item>
                    <el-form-item label="角色" prop="role" class="item">
                        <el-select v-model="ruleForm.role" class="item">
                        <el-option v-for="item of roleList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="数据权限" prop="permission" class="item">
                        <el-select v-model="ruleForm.permission" class="item">
                        <el-option v-for="item of permissionList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="员工编号" prop="staffNumber" class="item">
                      <el-input v-model="ruleForm.staffNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="账号状态" prop="accountState" class="item" v-show="isShow">
                      <el-radio-group v-model="ruleForm.accountState">
                          <el-radio label="1">开启</el-radio>
                          <el-radio label="2">关闭</el-radio>
                       </el-radio-group>
                    </el-form-item>
                    <el-form-item class="item">
                        <el-button type="primary" @click="confirm">确定</el-button>
                        <el-button @click="close">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!-- 查看弹窗 -->
        <div class="view" v-show="showFlag2">
            <div class="viewBox">
                <h3>{{viewTitle}}</h3>
                <ul>
                  <li><span>机构：</span><span>1111</span></li>
                  <li><span>账号状态：</span><span>1111</span></li>
                  <li><span>姓名：</span><span>1111</span></li>
                  <li><span>性别：</span><span>1111</span></li>
                  <li><span>用户名：</span><span>1111</span></li>
                  <li><span>手机号：</span><span>1111</span></li>
                  <li><span>角色：</span><span>1111</span></li>
                  <li><span>数据权限：</span><span>1111</span></li>
                  <li><span>机构编码：</span><span>1111</span></li>
                  <li><span>员工编号：</span><span>1111</span></li>
                </ul>
                <el-button @click="viewClose">返回</el-button>
            </div>
        </div>

        <!-- 删除/重置密码弹窗 -->
        <div class="reset" v-show="showFlag3">
          <div class="resetBox">
            <h3>提示</h3>
            <div class="tips">{{tipsTxet}}</div>
            <div class="resetBtn">
            <el-button type="primary" @click="resetConfirm">确定</el-button>
            <el-button @click="resetClose">取消</el-button>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import Pagination from "../../components/Pagination";
export default {
  name: "TopicManage",
  components: { Pagination, PageTitle },
  data() {
    return {
      //顶部搜索
      title: "账号管理",
      searchWord: "",
      //表格数据
      tableData: [
        {
          temp: "模板1"
        },
        {
          temp: "模板1"
        },
        {
          temp: "模板1"
        },
        {
          temp: "模板1"
        }
      ],
      //新增或修改数据
      showFlag1: false,
      isShow: false,
      boxTitle: "",
      ruleForm: {
        userName: "",
        staffName: "",
        mobile: "",
        organ: "",
        sex: "1",
        role: "",
        permission: "",
        staffNumber: "",
        accountState: "1"
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        staffName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        organ: [{ required: true, message: "请选择机构", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        permission: [
          { required: true, message: "请选择数据权限", trigger: "change" }
        ],
        staffNumber: [
          { required: true, message: "请输入员工编号", trigger: "blur" }
        ]
      },
      labelPosition: "right",
      organList: [],
      roleList: [],
      permissionList: [],
      //查看弹窗
      showFlag2: false,
      viewTitle: "",
      //删除、重置密码
      showFlag3:false,
      tipsTxet:'',
      //分页
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
      }
    };
  },
  methods: {
    search(){},
    add() {
      this.showFlag1 = true;
      this.boxTitle = "新增员工";
    },
    check() {
      this.showFlag2 = true;
      this.viewTitle = "基本信息";
    },
    modify() {
      this.showFlag1 = true;
      this.isShow = true;
      this.boxTitle = "修改信息";
    },
    remove() {
      this.showFlag3 = true;
      this.tipsTxet = "是否删除?";
    },
    reset(){
      this.showFlag3 = true;
      this.tipsTxet = "是否重置密码?";
    },
    viewClose(){
      this.showFlag2 = false;
    },
    confirm() {
      this.showFlag1 = false;
      this.isShow = false;
    },
    close() {
      this.showFlag1 = false;
      this.isShow = false;
    },
    resetConfirm() {
      this.showFlag3 = false;
    },
    resetClose() {
      this.showFlag3 = false;
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 20px;
}
.operate {
  margin-bottom: 20px;
}
.message_pagination {
  margin: 30px 0px;
}
.addStaff {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .addStaffBox {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-size: 488px 120px;
      margin: 0px;
    }
    .item {
      width: 400px;
      margin: 20px 20px 0px;
      .el-select {
        width: 300px;
        margin: 0px;
      }
      .el-radio-group {
        margin-left: -170px;
      }
    }
    .el-button {
      width: 100px;
      margin: 20px 20px;
    }
  }
}
.view {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .viewBox {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 420px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 100px;
      line-height: 100px;
      text-align: center;
      background-size: 488px 120px;
      margin: 0px;
    }
    ul {
      list-style: none;
      width: 100%;
      padding: 0;
      overflow: hidden;
      padding-right: 210px;
      li {
        width: 50%;
        float: left;
        margin: 10px 0;
        text-align: right;
      }
    }
    .el-button {
      width: 100px;
      margin: 20px 20px;
    }
  }
}
.reset {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .resetBox {
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
    .resetBtn {
      .el-button {
        margin: 0px 20px;
      }
    }
  }
}
</style>
