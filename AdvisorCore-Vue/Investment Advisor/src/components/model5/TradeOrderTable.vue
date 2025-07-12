<template>
  <div class="trade-order-table">
    <div class="toolbar">
      <el-button
        type="primary"
        :icon="Check"
        :disabled="selectedIds.length === 0"
        @click="handleBulkIssue"
      >
        一键下单
      </el-button>
      <el-button
        type="danger"
        :icon="Close"
        :disabled="selectedIds.length === 0"
        @click="handleBulkReject"
      >
        一键驳回
      </el-button>
    </div>

    <el-table
      :data="tableData"
      v-loading="loading"
      border
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="tradeId" label="交易ID" />
      <el-table-column prop="customerId" label="客户ID" />
      <el-table-column prop="portfolioId" label="组合ID" />
      <el-table-column prop="fundCode" label="基金代码" />
      <el-table-column prop="amount" label="金额" />
      <el-table-column prop="tradeType" label="交易类型" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="tradeTime" label="交易时间" />
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';

const props = defineProps<{ orderType: string }>();

interface TradeOrder {
  tradeId: number;
  // ... 其他字段
}

const tableData = ref<TradeOrder[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const selectedIds = ref<number[]>([]);
const status = ref(''); // 指令状态
const portfolioId = ref(); // 组合ID
const customerId = ref(); // 客户ID
const startDate = ref(''); // 交易时间起始
const endDate = ref(''); // 交易时间结束

const fetchData = async () => {
  loading.value = true;
  try {
    const params: { [key: string]: any } = {
      page: currentPage.value,
      pageSize: pageSize.value,
      orderType: props.orderType, // 交易类型
    };
    if (status.value) params.status = status.value;
    if (portfolioId.value) params.portfolioId = portfolioId.value;
    if (customerId.value) params.customerId = customerId.value;
    if (startDate.value) params.startDate = startDate.value;
    if (endDate.value) params.endDate = endDate.value;
    console.log(params)
    const response = await axios.get('http://localhost:8080/api/trade/orders', { params });
    console.log(response)
    total.value = response.data.data.total;
    tableData.value = response.data.data.list;
  } catch (error) {
    ElMessage.error('获取交易单失败');
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const handleSelectionChange = (selection: TradeOrder[]) => {
  selectedIds.value = selection.map((item) => item.tradeId);
};

const handleBulkIssue = async () => {
  try {
    const { value: operator } = await ElMessageBox.prompt('请输入操作员名称', '一键下单', {
      confirmButtonText: '确认下单',
      cancelButtonText: '取消',
      inputPattern: /.+/,
      inputErrorMessage: '操作员名称不能为空',
    });

    const requestBody = {
      trade_ids: selectedIds.value,
      operator,
    };
    console.log(requestBody)
    const response = await axios.post('http://localhost:8080/api/trade/orders/bulk_issue', requestBody);
    console.log(response)
    const { issued_count, failed_ids } = response.data.data;
    ElMessage.success(`成功下单 ${issued_count} 条，失败 ${failed_ids.length} 条。`);
    fetchData(); // 重新加载数据
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('下单操作失败');
    }
  }
};

const handleBulkReject = async () => {
  try {
    const { value: reject_reason } = await ElMessageBox.prompt('请输入驳回原因', '一键驳回', {
      confirmButtonText: '下一步',
      cancelButtonText: '取消',
      inputType: 'textarea',
      inputPattern: /.+/,
      inputErrorMessage: '驳回原因不能为空',
    });

    const { value: operator } = await ElMessageBox.prompt('请输入操作员名称', '确认驳回', {
      confirmButtonText: '确认驳回',
      cancelButtonText: '取消',
      inputPattern: /.+/,
      inputErrorMessage: '操作员名称不能为空',
    });

    const requestBody = {
      trade_ids: selectedIds.value,
      reject_reason,
      operator,
    };
    console.log(requestBody)
    const response = await axios.post('http://localhost:8080/api/trade/orders/bulk_reject', requestBody);
    console.log(response)
    const { rejected_count, failed_ids } = response.data.data;
    ElMessage.success(`成功驳回 ${rejected_count} 条，失败 ${failed_ids.length} 条。`);
    fetchData(); // 重新加载数据
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('驳回操作失败');
    }
  }
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchData();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchData();
};
</script>

<style scoped>
.toolbar {
  margin-bottom: 16px;
}
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
