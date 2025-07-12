<template>
  <div class="fund-candidate-view">
    <el-card>
      <template #header>
        <span>基金备选库</span>
      </template>
      <FundOptions />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import FundOptions from '../../components/model2/FundOptions.vue'
</script>

<style scoped>
.fund-candidate-view {
  padding: 0;
}
</style>