<template>
  <div>
    <page-title :title="title"></page-title>  <br>
    <div class="contain">
      <el-form label-width="0px" :model="pwdFrom">
        <el-form-item prop="oldPwd">
          <el-input v-model="pwdFrom.oldPwd" @input="validUsedPwd" placeholder="原密码" type="password"></el-input>
          <span class="tip">{{tip.usedPwdTxt}}</span>
        </el-form-item>
        <el-form-item prop="newPwd">
          <el-input v-model="pwdFrom.newPwd" @input="validNewPwdOnce" placeholder="新密码" type="password"></el-input>
          <span class="tip">{{tip.newPwdOnceTxt}}</span>
        </el-form-item>
        <el-form-item prop="newPwd1">
          <el-input v-model="pwdFrom.newPwd1" @input="validNewPwdAgain" placeholder="确认新密码" type="password"></el-input>
          <span class="tip">{{tip.newPwdAgainTxt}}</span>
        </el-form-item>
        <el-form-item class="loginBtn">
          <el-button @click.native.prevent="cancel" style="margin-right:25px">
            取消
          </el-button>
          <el-button type="primary" v-loading="loading" @click.native.prevent="confirm" style="margin-left:25px">
            确定
          </el-button>
      </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/pageTitle/pageTitle";
import global from "../../Global.js";
export default {
  name: "ChangePWd",
  data() {
    return {
      title: "修改密码",
      pwdFrom: {
        oldPwd: "",
        newPwd: "",
        newPwd1: ""
      },
      loading: false,
      flag: {
        isUsedPwd: false,
        isNewPwdOnce: false,
        isNewPwdAgain: false
      },
      tip: {
        usedPwdTxt: "",
        newPwdOnceTxt: "",
        newPwdAgainTxt: ""
      }
    };
  },
  components: {
    PageTitle
  },
  methods: {
    validUsedPwd() {
      if (this.pwdFrom.oldPwd == "") {
        this.flag.isUsedPwd = true;
        this.tip.usedPwdTxt = "密码不能为空";
        return false;
      } else {
        if (!/^\w{6,20}$/g.test(this.pwdFrom.oldPwd)) {
          this.flag.isUsedPwd = true;
          this.tip.usedPwdTxt = "英文数字6-20字符，不能含有特殊字符";
          return false;
        } else {
          this.flag.isUsedPwd = false;
          this.tip.usedPwdTxt = "";
        }
      }
    },
    validNewPwdOnce() {
      if (this.pwdFrom.newPwd == "") {
        this.flag.isNewPwdOnce = true;
        this.tip.newPwdOnceTxt = "密码不能为空";
        return false;
      } else {
        if (!/^\w{6,20}$/g.test(this.pwdFrom.newPwd)) {
          this.flag.isNewPwdOnce = true;
          this.tip.newPwdOnceTxt = "英文数字6-20字符，不能含有特殊字符";
          return false;
        } else {
          this.flag.isNewPwdOnce = false;
          this.tip.newPwdOnceTxt = "";
        }
      }
    },
    validNewPwdAgain() {
      if (this.pwdFrom.newPwd1 == "") {
        this.flag.isNewPwdAgain = true;
        this.tip.newPwdAgainTxt = "密码不能为空";
        return false;
      } else {
        if (!/^\w{6,20}$/g.test(this.pwdFrom.newPwd1)) {
          this.flag.isNewPwdAgain = true;
          this.tip.newPwdAgainTxt = "英文数字6-20字符，不能含有特殊字符";
          return false;
        } else {
          this.flag.isNewPwdAgain = false;
          this.tip.newPwdAgainTxt = "";
        }
      }
    },
    confirm() {
      this.validUsedPwd();
      this.validNewPwdOnce();
      this.validNewPwdAgain();
      if (this.pwdFrom.newPwd !== this.pwdFrom.newPwd1) {
        this.$message({ type: "info", message: "两次密码输入不一致!" });
        return false;
      }
      if (
        this.flag.isUsedPwd ||
        this.flag.isNewPwdOnce ||
        this.flag.isNewPwdAgain
      ) {
        return false;
      }
      this.loading = true;
      this.$http
        .post(global.commonapi + "/Employee/UpdatePassword", {
          oldPwd: this.pwdFrom.oldPwd,
          newPwd: this.pwdFrom.newPwd
        })
        .then(res => {
          this.loading = false;
          if (res.data.Code == 1) {
            this.pwdFrom.oldPwd = "";
            this.pwdFrom.newPwd = "";
            this.pwdFrom.newPwd1 = "";
            this.tip = {
              usedPwdTxt: "",
              newPwdOnceTxt: "",
              newPwdAgainTxt: ""
            };
            this.$message({ type: "success", message: "修改成功！" });
            this.$router.push({ path: "/home" });
          } else {
            this.$message({ type: "info", message: res.data.Message });
          }
        })
        .catch(function(error) {
          //loading.close();
        });
    },
    cancel() {
      window.history.go(-1);
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.contain {
  width: 300px;
  height: 40%;
  margin: 0 auto;
  margin-top: 120px;
  .tip {
    display: block;
    height: 30px;
    font-size: 14px;
    color: red;
    margin: 0px;
  }
  .el-button {
    width: 120px;
  }
  .el-form-item{
    margin-bottom: 0px;
  }
}
</style>
