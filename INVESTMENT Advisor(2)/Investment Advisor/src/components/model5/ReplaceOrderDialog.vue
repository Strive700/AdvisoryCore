<template>
  <el-dialog
    v-model="dialogVisible"
    title="替换失败交易"
    width="500px"
    @closed="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="loading"
    >
      <el-form-item label="原基金代码">
        <el-input :value="originalFundCode" disabled />
      </el-form-item>
      <el-form-item label="新基金代码" prop="newFundCode">
        <el-input v-model="formData.newFundCode" placeholder="请输入要替换的基金代码" />
      </el-form-item>
      <el-form-item label="替换原因" prop="reason">
        <el-input
          v-model="formData.reason"
          type="textarea"
          placeholder="请输入替换原因"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认替换</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const props = defineProps<{
  visible: boolean;
  tradeId: number | null;
  originalFundCode: string;
}>();

const emit = defineEmits(['update:visible', 'success']);

const dialogVisible = ref(false);
const formRef = ref<FormInstance>();
const loading = ref(false);

const formData = reactive({
  newFundCode: '',
  reason: '',
});

const formRules = reactive<FormRules>({
  newFundCode: [
    { required: true, message: '请输入新基金代码', trigger: 'blur' },
  ],
  reason: [
    { required: true, message: '请输入替换原因', trigger: 'blur' },
  ],
});

watch(() => props.visible, (val) => {
  dialogVisible.value = val;
});

const handleClose = () => {
  formRef.value?.resetFields();
  emit('update:visible', false);
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        const requestBody = {
          newFundCode: formData.newFundCode,
          reason: formData.reason,
        };
        console.log(requestBody)
        const response = await axios.post(`http://localhost:8080/api/trade/orders/${props.tradeId}/replace`, requestBody);
        console.log(response)
        ElMessage.success('替换成功');
        emit('success');
        dialogVisible.value = false;
      } catch (error) {
        ElMessage.error('替换失败');
        console.error(error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
