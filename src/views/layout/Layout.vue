<template>
  <div class="app-wrapper">
    <headbar></headbar>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
    <!-- <div class="copyright">
      <p>人民周刊后台管理系统V1.0正式版2018 All Rights Reserved 京ICP11013367</p>
    </div> -->
  </div>
</template>

<script>
import {
  Headbar,
  Sidebar,
  AppMain,
  TagsView
} from "@/views/layout/components";
import store from "@/store";

export default {
  name: "layout",
  components: {
    Headbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    routes() {
      return store.getters.routers;
    },
    sidebar() {
      return this.$store.state.app.sidebar;
    }
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import "../../styles/mixin.less";
.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
  padding: 134px 0px 0px 240px;
  box-sizing: border-box;
  .sidebar-container {
    position: fixed;
    top: 134px;
    left: 0px;
  }
  .main-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f6f6f6;
    background-size: 100%;
  }
  .copyright {
    position: fixed;
    bottom: 20px;
    left: 37.5%;
    font-size: 20px;
    color: #5a5b5b;
    letter-spacing: 1px;
    p {
      margin: 0px;
    }
  }
}
</style>
