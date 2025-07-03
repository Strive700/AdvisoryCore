<template>
  <div class="failed-orders-view">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>失败交易处理</span>
        </div>
      </template>
      <FailedOrdersTable />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import FailedOrdersTable from '../../components/model5/FailedOrdersTable.vue';
</script>

<style scoped>
.failed-orders-view {
  padding: 24px;
}
.card-header {
  font-size: 18px;
  font-weight: bold;
}
</style>
