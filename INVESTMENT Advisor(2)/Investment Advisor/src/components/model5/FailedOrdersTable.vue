<template>
  <div class="failed-orders-table">
    <!-- 筛选区域 -->
    <el-card class="filter-card" shadow="never">
      <el-form :model="filters" inline label-width="80px">
        <el-form-item label="组合ID">
          <el-input v-model.number="filters.portfolioId" placeholder="请输入组合ID" clearable />
        </el-form-item>
        <el-form-item label="客户ID">
          <el-input v-model.number="filters.customerId" placeholder="请输入客户ID" clearable />
        </el-form-item>
        <el-form-item label="交易类型">
          <el-select v-model="filters.tradeType" placeholder="请选择交易类型" clearable>
            <el-option label="买入" value="BUY" />
            <el-option label="卖出" value="SELL" />
          </el-select>
        </el-form-item>
        <el-form-item label="失败原因">
          <el-input v-model="filters.failReason" placeholder="请输入失败原因（模糊）" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区域 -->
    <el-card shadow="never">
      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column prop="tradeId" label="交易ID" width="100" />
        <el-table-column prop="customerId" label="客户ID" width="100" />
        <el-table-column prop="portfolioId" label="组合ID" width="100" />
        <el-table-column prop="fundCode" label="基金代码" width="120" />
        <el-table-column prop="amount" label="金额" width="120" />
        <el-table-column prop="tradeType" label="交易类型" width="100" />
        <el-table-column prop="tradeTime" label="交易时间" width="180" />
        <el-table-column prop="failReason" label="失败原因" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button type="primary" link @click="handleProcess(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="pagination-container">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 50]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 替换对话框 -->
    <ReplaceOrderDialog
      v-model:visible="dialogVisible"
      :trade-id="selectedTradeId"
      :original-fund-code="selectedFundCode"
      @success="fetchData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { Search, Refresh } from '@element-plus/icons-vue';
import ReplaceOrderDialog from './ReplaceOrderDialog.vue';

// 定义数据结构
interface FailedOrder {
  tradeId: number;
  customerId: number;
  fundCode: string;
  portfolioId: number;
  rebalanceId: number;
  amount: number;
  shares: number;
  tradeType: string;
  reason: string;
  tradeTime: string;
  status: string;
  failReason: string;
  replaceOrderId: number | null;
}

// 筛选条件
const filters = ref({
  portfolioId: '',
  customerId: '',
  tradeType: '',
  failReason: '',
});

// 表格和分页数据
const tableData = ref<FailedOrder[]>([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);

// 对话框相关
const dialogVisible = ref(false);
const selectedTradeId = ref<number | null>(null);
const selectedFundCode = ref('');

// 获取数据方法
const fetchData = async () => {
  loading.value = true;
  try {
    const params = {
      page: currentPage.value,
      pageSize: pageSize.value,
      portfolioId: filters.value.portfolioId || undefined,
      customerId: filters.value.customerId || undefined,
      tradeType: filters.value.tradeType || undefined,
      failReason: filters.value.failReason || undefined,
    };
    console.log(params)
    const response = await axios.get('http://localhost:8080/api/trade/orders/failed', { params });
    console.log(response)
    if (response.data && response.data.code === 0 && response.data.data) {
        total.value = response.data.data.total;
        tableData.value = response.data.data.list;
    } else {
        ElMessage.error(response.data.msg || '获取数据格式不正确');
    }
  } catch (error) {
    ElMessage.error('获取失败交易数据失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};

// 事件处理
onMounted(fetchData);

const handleSearch = () => {
  currentPage.value = 1;
  fetchData();
};

const handleReset = () => {
  filters.value = { portfolioId: '', customerId: '', tradeType: '', failReason: '' };
  handleSearch();
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchData();
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchData();
};

const handleProcess = (row: FailedOrder) => {
  selectedTradeId.value = row.tradeId;
  selectedFundCode.value = row.fundCode;
  dialogVisible.value = true;
};
</script>

<style scoped>
.filter-card {
  margin-bottom: 20px;
}
.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
