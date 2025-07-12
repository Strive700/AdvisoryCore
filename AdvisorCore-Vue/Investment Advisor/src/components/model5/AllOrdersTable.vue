<template>
  <div class="all-orders-table">
    <el-card class="filter-card" shadow="never">
      <el-form :model="filters" inline label-width="80px">
        <el-form-item label="组合ID">
          <el-input v-model.number="filters.portfolioId" placeholder="请输入组合ID" clearable />
        </el-form-item>
        <el-form-item label="客户ID">
          <el-input v-model.number="filters.customerId" placeholder="请输入客户ID" clearable />
        </el-form-item>
        <el-form-item label="交易类型">
          <el-input v-model="filters.orderType" placeholder="请输入交易类型" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="filters.status" placeholder="请输入指令状态" clearable />
        </el-form-item>
        <el-form-item label="起始日期">
          <el-date-picker v-model="filters.startDate" type="date" placeholder="起始日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker v-model="filters.endDate" type="date" placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-table :data="tableData" v-loading="loading" border stripe>
        <el-table-column prop="tradeId" label="交易ID" width="100" />
        <el-table-column prop="customerId" label="客户ID" width="100" />
        <el-table-column prop="portfolioId" label="组合ID" width="100" />
        <el-table-column prop="fundCode" label="基金代码" width="120" />
        <el-table-column prop="amount" label="金额" width="120" />
        <el-table-column prop="tradeType" label="交易类型" width="100" />
        <el-table-column prop="status" label="状态" width="100" />
        <el-table-column prop="tradeTime" label="交易时间" width="180" />
      </el-table>
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
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
const filters = ref({
  portfolioId: '',
  customerId: '',
  orderType: '',
  status: '',
  startDate: '',
  endDate: '',
});
const tableData = ref([]);
const loading = ref(false);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const fetchData = async () => {
  loading.value = true;
  try {
    const params: { [key: string]: any } = {
      page: currentPage.value,
      pageSize: pageSize.value,
    };
    if (filters.value.portfolioId) params.portfolioId = Number(filters.value.portfolioId);
    if (filters.value.customerId) params.customerId = Number(filters.value.customerId);
    if (filters.value.orderType) params.orderType = filters.value.orderType;
    if (filters.value.status) params.status = filters.value.status;
    if (filters.value.startDate) params.startDate = filters.value.startDate;
    if (filters.value.endDate) params.endDate = filters.value.endDate;
    const response = await axios.get('http://localhost:8080/api/trade/orders', { params });
    console.log(response)
    if (response.data && response.data.code === 0 && response.data.data) {
      total.value = response.data.data.total;
      tableData.value = response.data.data.list;
    } else {
      ElMessage.error(response.data.msg || '获取数据格式不正确');
    }
  } catch (error) {
    ElMessage.error('获取全部交易数据失败');
    console.error(error);
  } finally {
    loading.value = false;
  }
};
onMounted(fetchData);
const handleSearch = () => {
  currentPage.value = 1;
  fetchData();
};
const handleReset = () => {
  filters.value = { portfolioId: '', customerId: '', orderType: '', status: '', startDate: '', endDate: '' };
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
</script>
<style scoped>
.filter-card { margin-bottom: 20px; }
.pagination-container { display: flex; justify-content: flex-end; margin-top: 20px; }
</style>
