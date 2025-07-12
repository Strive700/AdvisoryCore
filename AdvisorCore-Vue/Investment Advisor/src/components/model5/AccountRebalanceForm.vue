<template>
  <div class="account-rebalance-form">
    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="right">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="组合ID" prop="portfolioId">
            <el-input v-model="formData.portfolioId" placeholder="请输入组合ID" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户ID" prop="customerId">
            <el-input v-model.number="formData.customerId" placeholder="请输入客户ID" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="操作人" prop="operator">
        <el-input v-model="formData.operator" placeholder="请输入操作人姓名" />
      </el-form-item>
      <el-form-item label="调仓原因" prop="reason">
        <el-input v-model="formData.reason" type="textarea" :rows="3" placeholder="请输入本次调仓的原因" />
      </el-form-item>

      <el-divider />

      <div class="details-header">
        <span class="details-title">调仓明细</span>
        <el-button type="primary" :icon="Plus" circle @click="addDetailRow" />
      </div>

      <el-table :data="formData.details" border style="width: 100%">
        <el-table-column label="基金代码" prop="fund_code" width="150">
          <template #default="{ row }">
            <el-input v-model="row.fund_code" placeholder="基金代码" />
          </template>
        </el-table-column>
        <el-table-column label="原权重" prop="old_weight" width="180">
          <template #default="{ row }">
            <el-input-number v-model="row.old_weight" :min="0" :max="1" :step="0.01" controls-position="right" @change="() => calculateDiff(row)" />
          </template>
        </el-table-column>
        <el-table-column label="新权重" prop="new_weight" width="180">
          <template #default="{ row }">
            <el-input-number v-model="row.new_weight" :min="0" :max="1" :step="0.01" controls-position="right" @change="() => calculateDiff(row)" />
          </template>
        </el-table-column>
        <el-table-column label="权重差值" prop="diff">
           <template #default="{ row }">
            <span>{{ row.diff?.toFixed(4) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template #default="scope">
            <el-button type="danger" :icon="Delete" circle @click="removeDetailRow(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
      <div v-if="weightSumError" class="error-tip">
        {{ weightSumError }}
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { Plus, Delete } from '@element-plus/icons-vue';

interface RebalanceDetail {
  fund_code: string;
  old_weight: number;
  new_weight: number;
  diff: number;
}

const formRef = ref<FormInstance>();

const formData = ref({
  portfolioId: '',
  customerId: undefined,
  reason: '',
  operator: '',
  details: [] as RebalanceDetail[],
});

const formRules = reactive<FormRules>({
  portfolioId: [{ required: true, message: '组合ID不能为空', trigger: 'blur' }],
  customerId: [{ required: true, message: '客户ID不能为空', trigger: 'blur' }],
  reason: [{ required: true, message: '调仓原因不能为空', trigger: 'blur' }],
  operator: [{ required: true, message: '操作人不能为空', trigger: 'blur' }],
});

const weightSumError = computed(() => {
  if (!formData.value.details || formData.value.details.length === 0) return '';
  const sum = formData.value.details.reduce((acc, detail) => acc + (detail.new_weight || 0), 0);
  if (Math.abs(sum - 1.0) > 1e-6) {
    return `新权重之和必须为1，当前为: ${sum.toFixed(4)}`;
  }
  return '';
});

const calculateDiff = (row: RebalanceDetail) => {
  row.diff = (row.new_weight || 0) - (row.old_weight || 0);
};

const addDetailRow = () => {
  formData.value.details.push({
    fund_code: '',
    old_weight: 0,
    new_weight: 0,
    diff: 0,
  });
};

const removeDetailRow = (index: number) => {
  formData.value.details.splice(index, 1);
};

const submit = async () => {
  if (!formRef.value) return null;
  await formRef.value.validate();
  if (weightSumError.value) {
    ElMessage.error(weightSumError.value);
    return null;
  }
   if (formData.value.details.length === 0) {
    ElMessage.error('至少需要一条调仓明细');
    return null;
  }
  return formData.value;
};

const reset = () => {
    if (!formRef.value) return;
    formRef.value.resetFields();
    formData.value.details = [];
}

defineExpose({ submit, reset });
</script>

<style scoped>
.details-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.details-title {
  font-size: 16px;
  font-weight: bold;
  margin-right: 16px;
}
.error-tip {
  color: var(--el-color-danger);
  margin-top: 8px;
  font-size: 12px;
}
</style>
