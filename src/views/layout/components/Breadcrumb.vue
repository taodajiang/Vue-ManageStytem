<template>
    <div class="bread">
          <!-- <img style="height:22px; margin:31px 10px" src="../../../assets/img/home1.png" alt=""> -->
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size:18px;margin:32px 0px;">
              <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
                <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
                <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- <img src="../../../assets/img/logo3.png" alt="" style="margin:6px 500px;"> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    };
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== "首页") {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
    }
  }
};
</script>

<style scoped lang="less">
.bread {
  width: 100%;
  height: 84px;
  position: fixed;
  top: 50px;
  left: 240px;
  right: 0px;
  bottom: 0px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  background-color: #f6f6f6;
  z-index: 999;
  .breadcrumb {
    // width: 14%;
    height: 84px;
    box-sizing: border-box;
    display: inline-block;
    z-index: 999;
  }
}
</style>
