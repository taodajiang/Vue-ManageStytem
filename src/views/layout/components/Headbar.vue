<template>
	<div class="head clearfix">
		<div class="userinfo">
      <div class="left">{{Now}}</div>
		  <div class="right">
			  <span><i class="icon_user"></i>欢迎您，<span class="user">{{userName}}</span></span>
			  <span class="modify_password" @click="changePassword"><i class="icon_modify"></i>修改密码</span>
			  <span class="logo_out" @click="logout"><i class="icon_logout"></i>安全退出</span>
		  </div>
    </div>
    <div class="top clearfix">
      <div class="logo">
          <!-- <img src="../../../assets/img/logo.png" alt=""> -->
      </div>
    </div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      Now: "",
      Days: "",
      userName: ""
    };
  },
  created() {
    this.currentTime();
    this.getUserName();
  },
  methods: {
    getUserName() {
      let userName = localStorage.getItem("username");
      if (userName) {
        this.userName = userName;
      } else {
        this.userName = "未知用户";
      }
    },
    logout() {
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    changePassword() {
      this.$router.push({ path: "/home/changePWd" });
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    }, //补0
    //返回中文星期几
    switchDays(day) {
      switch (day) {
        case 0:
          return "日";
          break;
        case 1:
          return "一";
          break;
        case 2:
          return "二";
          break;
        case 3:
          return "三";
          break;
        case 4:
          return "四";
          break;
        case 5:
          return "五";
          break;
        case 6:
          return "六";
          break;
      }
    },
    //设置当前时间
    currentTime() {
      var now1 = new Date();
      var month = now1.getMonth() + 1;
      var date1 = now1.getDate();
      var Days1 = this.switchDays(now1.getDay());
      //让时间在页面显示
      this.Now = `${now1.getFullYear()}年${this.add0(month)}月${this.add0(
        date1
      )}日 星期${Days1}`;
    }
  }
};
</script>

<style scoped lang="less">
.head {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 134px;
  z-index: 999;
  .userinfo {
    background: black;
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-size: 14px;
    color: #fff;
    .left {
      float: left;
      margin-left: 40px;
    }
    .right {
      float: right;
      margin-right: 40px;
      .modify_password {
        cursor: pointer;
        margin-left: 10px;
      }
      .logo_out {
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }
  .top {
    width: 100%;
    height: 84px;
    .logo {
      float: left;
      width: 240px;
      height: 84px;
      text-align: center;
      // background-image: url("../../../assets/img/bg.png");
      background-size: 240px;
      box-sizing: border-box;
      img{
        height: 84px;
      }
    }
  }
}
.icon_user {
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: -3px;
  // background: url(../../../assets/img/userH.png) no-repeat;
  background-size: 18px 18px;
}
.icon_modify {
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: -3px;
  // background: url(../../../assets/img/passw.png) no-repeat;
  background-size: 18px 18px;
}
.icon_logout {
  display: inline-block;
  width: 18px;
  height: 18px;
  vertical-align: -3px;
  // background: url(../../../assets/img/logout.png) no-repeat;
  background-size: 18px 18px;
}
</style>
