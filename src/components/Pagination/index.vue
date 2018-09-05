<template>
      <div class="block">
        <el-pagination
          @size-change="paginationData.handleSizeChange"
          @current-change="paginationData.handleCurrentChange"
          :current-page="paginationData.currentPage"
          :page-sizes="paginationData.pageSizes"
          :page-size="paginationData.pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.total">
        </el-pagination>

        <el-button class="checkButton" type="primary">确定</el-button>
      </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["paginationData"]
};
</script>

<style lang="less" scoped>
.block{
  display: flex;
}
.el-pagination {
  text-align: left !important;
}

.checkButton{
  width: 70px;
  height: 35px;
  text-align: center;
  margin-left: 10px;
  line-height: 10px;
}
</style>

