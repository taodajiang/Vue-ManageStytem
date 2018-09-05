<template>
    <div class="f-midbody">
        <div class="organization">
            <page-title :title="title"></page-title>
            <div class="treeBox">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" style="margin-top:20px;">
                    <i class="el-icon-search" style="margin-right:10px;margin-top:12px;font-size:20px" slot="suffix"></i>
                </el-input>

                <el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :default-checked-keys="[1]" :filter-node-method="filterNode" ref="tree2" @node-click="handleNodeClick">
                </el-tree>
            </div>
        </div>
        <div class="organizationInfo">
            <p>维护机构</p>
            <p>机构编码：<span>{{organizationNumber}}</span></p>
            <p>上级名称：<span>{{superior}}</span></p>
            <p>机构名称：<span>{{organizationName}}</span>
            </p>
            <div class="opterate">
                <el-button type="primary" size="small" @click="add"><i class="el-icon-plus"></i>新增</el-button>
                <el-button type="warning" size="small" @click="modify"><i class="el-icon-plus"></i>编辑</el-button>
                <el-button type="danger" size="small" @click="remove"><i class="el-icon-plus"></i>删除</el-button>
            </div>
        </div>

        <!-- 新增弹框 -->
        <div class="addOrganization" v-show="isShow">
            <div class="addBox">
                <h3>新增机构</h3>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form" :label-position="labelPosition">
                    <el-form-item label="上级名称" prop="parentid" class="item" v-model="ruleForm.parentid">
                        <el-cascader :options="list" :props="props" v-model="parentList" change-on-select @change="handleChange" placeholder="请选择上级名称" clearable>
                            ></el-cascader>
                    </el-form-item>
                    <el-form-item label="机构名称" prop="orgname" class="item">
                        <el-input v-model="ruleForm.orgname"></el-input>
                    </el-form-item>
                    <el-form-item class="buttonLine">
                        <el-button type="primary" @click="addConfirm" round>确定</el-button>
                        <el-button @click="addCancel" style="margin-right:60px;margin-left:80px;color:#c3b382;border: 1px solid #c3b382;" :plain="true" round>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!-- 编辑弹框 -->
        <div class="modifyOrganization" v-show="isShow1">
            <div class="editBox">
                <h3>编辑机构</h3>
                <el-form :model="ruleForm1" ref="ruleForm1" label-width="100px" class="form" :label-position="labelPosition1">
                    <el-form-item label="机构编号" prop="orgid" class="item">
                        <el-input v-model="ruleForm1.orgid" :disabled="true"></el-input>
                    </el-form-item>

                    <el-form-item label="上级名称" prop="parentid" class="item" v-model="ruleForm1.parentid">
                        <el-cascader :options="list" :props="props" change-on-select :placeholder="superior" v-model="parentList" @change="handleChange2">
                            ></el-cascader>
                    </el-form-item>

                    <el-form-item label="机构名称" prop="orgname" class="item">
                        <el-input v-model="ruleForm1.orgname"></el-input>
                    </el-form-item>
                    <el-form-item class="footer">
                        <el-button type="primary" class="left" @click="modifyConfirm" round>确定</el-button>
                        <el-button @click="modifyCancel" class="right" round>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

        <!-- 删除弹框 -->
        <div class="detela" v-show="isShow2">
            <div class="detelaBox">
                <h3>提示</h3>
                <div class="tips">
                    <span>是否确定删除?</span>
                </div>
                <div class="detelaBtn">
                  <el-button type="primary" @click="removeConfirm">确定</el-button>
                  <el-button @click="removeCancel">取消</el-button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import global from "../../Global.js";
export default {
  name: "OrganizationManage",
  components: { PageTitle },
  data() {
    return {
      //机构管理tree
      title: "机构管理",
      filterText: "",
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //右侧显示数据
      organizationNumber: "",
      superior: "",
      organizationName: "",
      //新增
      isShow: false,
      ruleForm: {
        parentid: "",
        orgname: ""
      },
      rules: {
        parentid: [
          { required: true, message: "请选择上级机构", trigger: "change" }
        ],
        orgname: [
          { required: true, message: "请输入机构名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      labelPosition: "right",
      props: {
        value: "ID",
        label: "OrgName",
        children: "Children"
      },
      parentList: [],
      //编辑
      isShow1: false,
      ruleForm1: {
        orgid: "",
        parentid: "",
        orgname: ""
      },
      labelPosition1: "right",
      parentList: [],
      //删除
      isShow2: false
    };
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick() {},
    add() {
      this.isShow = true;
    },
    addConfirm() {
      this.isShow = false;
    },
    addCancel() {
      this.isShow = false;
    },
    modify() {
      this.isShow1 = true;
    },
    modifyConfirm() {
      this.isShow1 = false;
    },
    modifyCancel() {
      this.isShow1 = false;
    },
    remove() {
      this.isShow2 = true;
    },
    removeConfirm() {
      this.isShow2 = false;
    },
    removeCancel() {
      this.isShow2 = false;
    },
    handleChange() {},
    handleChange2() {}
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  }
};
</script>

<style lang="less" scoped>
.f-midbody {
  position: relative;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.treeBox {
  border: 1px solid #c9c9c9;
  height: 500px;
  overflow-y: auto;
  background: #fff;
  margin-top: 20px;
  padding: 15px;
  .el-input {
    width: 90% !important;
    margin-left: 5%;
  }
}

.organization {
  width: 300px;
  margin: 0 30px;
  float: left;
  margin-right: 100px;
}

.organizationInfo {
  width: 30%;
  float: left;
  margin-top: 50px;
  .opterate {
    margin-top: 110px;
    .el-button {
      width: 100px;
      height: 38px;
      padding: 0px;
      font-size: 16px;
    }
  }
}

.addOrganization {
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
    height: 420px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 120px;
      line-height: 150px;
      text-align: center;
      background-size: 488px 120px;
      margin: 0px;
    }
    .item {
      width: 400px;
      margin: 50px auto;
      .el-cascader {
        width: 250px;
      }
    }
    .el-input {
      width: 250px !important;
    }
    .buttonLine {
      width: 100%;
      height: 50px;
      text-align: center;
      .el-button {
        width: 100px !important;
        height: 36px !important;
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
}

.modifyOrganization {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  text-align: center;
  .left,
  .right {
    width: 100px;
    height: 36px !important;
    font-weight: bolder;
    font-size: 16px;
  }
  .right {
    margin-left: 50px;
    margin-right: 70px;
    border: 1px solid #c3b382;
    color: #c3b382;
  }
  .editBox {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    width: 488px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    h3 {
      display: block;
      height: 120px;
      line-height: 120px;
      text-align: center;
      //background: url(../../assets/img/tc_bg3.png) no-repeat;
      background-size: 488px 120px;
      margin: 0px;
    }
    .form {
      margin-top: 50px;
    }
    .item {
      width: 400px;
      margin: 30px auto;
    }
    .footer {
      margin: 50px auto;
    }
  }
  .el-input {
    width: 220px !important;
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
</style>
