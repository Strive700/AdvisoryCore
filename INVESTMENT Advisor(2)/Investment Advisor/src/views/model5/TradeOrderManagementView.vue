<template>
  <div class="trade-order-management-view">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>交易单管理</span>
        </div>
      </template>
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="建仓交易单" name="CREATE">
          <TradeOrderTable v-if="activeTab === 'CREATE'" order-type="CREATE" />
        </el-tab-pane>
        <el-tab-pane label="调仓交易单" name="REBALANCE">
          <TradeOrderTable v-if="activeTab === 'REBALANCE'" order-type="REBALANCE" />
        </el-tab-pane>
        <el-tab-pane label="差错处理交易单" name="CORRECTION">
          <TradeOrderTable v-if="activeTab === 'CORRECTION'" order-type="CORRECTION" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TradeOrderTable from '../../components/model5/TradeOrderTable.vue';

const activeTab = ref('CREATE');
</script>

<style scoped>
.trade-order-management-view {
  padding: 24px;
}
.card-header {
  font-size: 18px;
  font-weight: bold;
}
</style>
