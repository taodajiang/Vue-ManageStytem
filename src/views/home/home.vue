<template>
  <div class="home-container">
    这是主页
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(['name','roles'])
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
.home-container {
  width: 100%;
  text-align: center;
  img{
    position: absolute;
    top:0;
    left: -10%;
    bottom: 70px;
    right: 0;
    margin: auto;
  }
}
</style>
