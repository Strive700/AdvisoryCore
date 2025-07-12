<template>
  <div class="fund-candidate-view">
    <el-card>
      <template #header>
        <span>因子树展示</span>
      </template>
      <FactorTree />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import FactorTree from '../../components/model2/FactorTree.vue';
</script>

<style scoped>
.fund-candidate-view {
  padding: 0;
}
</style>