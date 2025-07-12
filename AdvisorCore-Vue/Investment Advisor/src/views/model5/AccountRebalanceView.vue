<template>
  <div class="account-rebalance-view">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>账户独立调仓</span>
        </div>
      </template>
      <AccountRebalanceForm ref="rebalanceFormRef" />
      <div class="footer-buttons">
        <el-button @click="handleReset">重置表单</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="loading">提交任务</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import AccountRebalanceForm from '../../components/model5/AccountRebalanceForm.vue';

const rebalanceFormRef = ref<{ submit: () => Promise<any | null>, reset: () => void } | null>(null);
const loading = ref(false);

const handleSubmit = async () => {
  if (!rebalanceFormRef.value) return;

  loading.value = true;
  try {
    const formData = await rebalanceFormRef.value.submit();
    if (formData) {
      // 后端要求 details.diff 字段，但前端已实时计算，无需再处理
      await axios.post('http://localhost:8080/api/rebalance/account/submit', formData);
      ElMessage.success('账户独立调仓任务提交成功');
      rebalanceFormRef.value.reset();
    }
  } catch (error) {
     if (axios.isAxiosError(error) && error.response) {
       ElMessage.error(error.response.data.message || '提交失败，请检查数据');
     } else {
       ElMessage.error('提交过程中发生未知错误');
     }
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  if (rebalanceFormRef.value) {
    rebalanceFormRef.value.reset();
  }
};
</script>

<style scoped>
.account-rebalance-view {
  padding: 24px;
}
.card-header {
  font-size: 18px;
  font-weight: bold;
}
.footer-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
  gap: 12px;
}
</style>
