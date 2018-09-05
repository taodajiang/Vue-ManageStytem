<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#2d2d2d" text-color="#c8c9cc" active-text-color="#cdb27e">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import store from '@/store'
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return store.getters.routers;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>

 <style scoped lang="less">
.el-menu {
  border: 0;
  text-align: center;
}
</style>
 