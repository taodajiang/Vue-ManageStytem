<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" 
      class="card-box login-form">
      <el-form-item prop="account">
        <span class="Account"></span>
        <el-input name="account" type="text" v-model="loginForm.account" autoComplete="on" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="Paw"></span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="loginBtn">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <div class="copyright">
      <p>人民周刊后台管理系统V1.0正式版2018 All Rights Reserved 京ICP11013367</p>
    </div>
  </div>
</template>

<script>
//import { isvalidUsername } from '@/utils/validate'

export default {
  name: "login",
  data() {
    const validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [
          { required: true, trigger: "blur", validator: validateAccount }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        this.$router.push({ path: "/home" });
        // if (valid) {
        //   this.loading = true;
        //   this.loginForm.account = this.loginForm.account.trim();
        //   sessionStorage.setItem("userinfo", JSON.stringify(this.loginForm));
        //   var userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
        //   this.$store
        //     .dispatch("Login", userinfo)
        //     .then(() => {
        //       this.loading = false;
        //       this.$router.push({ path: "/home" });
        //     })
        //     .catch(() => {
        //       this.loading = false;
        //     });
        // } else {
        //   return false;
        // }
      });
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less">
@bg: #2d3a4b;
@dark_gray: #889aa4;
@light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  //background: url("../../assets/img/bg.jpg") no-repeat;
  background-color: #f6f6f6;
  background-size: 100% 100%;
  input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 30px;
    padding: 12px 5px 12px 36px;
    color: #969696;
    height: 47px;
    font-size: 16px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 80%;
    margin-left: 20px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: @light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 500px;
    height: 300px;
    padding: 40px 35px 15px 35px;
    margin: 120px auto;
    margin-top: 410px;
    box-sizing: border-box;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 20px;
    -moz-box-shadow: 0 0 10px 10px #ccc;
    -webkit-box-shadow: 0 0 10px 10px #ccc;
    box-shadow: 0 15px 10px 0px rgb(73,88,101);
    .Account {
      position: absolute;
      top: 8px;
      left: 0px;
      width: 34px;
      height: 28px;
      //background: url("../../assets/img/user.png") no-repeat;
      background-size: 20px;
      margin-top: 5px;
    }
    .Paw {
      position: absolute;
      top: 8px;
      left: 0px;
      width: 34px;
      height: 28px;
      //background: url("../../assets/img/code.png") no-repeat;
      background-size: 20px;
      margin-top: 5px;
    }
    .loginBtn {
      background-color: #c3b382;
    }
    .el-button--primary {
      background-color: #c3b382;
      border-radius: 30px;
      height: 46px;
      font-size: 20px;
      border: 0;
    }
  }
  .el-form-item {
    width: 400px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #e7e9e9;
    border-radius: 30px;
    color: red;
    padding: 5px 30px;
    box-sizing: border-box;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
  .copyright {
    position: fixed;
    bottom: 0px;
    left: 32.5%;
    font-size: 20px;
    color: rgb(206,192,151);
    letter-spacing: 1px;
    z-index: 999;
    p{
       margin: 0;
    }
  }
}
</style>
