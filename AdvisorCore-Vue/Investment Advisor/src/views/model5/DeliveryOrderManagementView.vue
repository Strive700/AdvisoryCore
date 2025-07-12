<template>
  <div class="delivery-order-management-view">
    <el-card>
      <template #header>
        <span>交割单管理</span>
      </template>
      <DeliveryOrderTable />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import DeliveryOrderTable from '../../components/model5/DeliveryOrderTable.vue'
</script>

<style scoped>
.delivery-order-management-view {
  padding: 24px;
}
</style>