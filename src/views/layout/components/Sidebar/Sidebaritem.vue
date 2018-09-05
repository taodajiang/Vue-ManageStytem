<template>
  <div class="menu-wrapper">
            <template v-for="item in routes" v-if="!item.hidden&&item.children">
              <el-submenu :index="item.path" :key="item.name" v-if="item.meta">
                  <template slot="title"><i :class="item.meta.icon" style="margin-right:30px"></i>{{ item.meta.title }}</template>

                  <template v-for="child in item.children" v-if="!child.hidden">
                    <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

                    <router-link :to="item.path+'/'+child.path" :key="child.name">
                      <el-menu-item :index="item.path+'/'+child.path">
                      <span v-if="child.meta&&child.meta.title" slot="title"><i :class="child.meta.icon" style="margin-right:20px"></i>{{child.meta.title}}</span>
                      </el-menu-item>
                    </router-link>
                  </template>
              </el-submenu>
              <el-submenu v-else :index="item.path" :key="item.name">
                <template slot="title">{{ item.name }}</template>
              </el-submenu>
          </template>
    </div>
</template>

<script>
export default {
  name: "SidebarItem",
  computed: {
    onRoutes() {
      return this.$route.path.replace("/permission", "");
    }
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="less">
// .el-menu {
//   background-color: #c3b382;
// }
</style>

