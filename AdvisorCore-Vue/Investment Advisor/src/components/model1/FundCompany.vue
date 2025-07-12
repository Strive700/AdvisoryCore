<template>
  <div class="main-inner-card fund-company-filter-table">
    <!-- 筛选条件区 -->
    <el-card class="filter-card" shadow="never">
      <el-form :inline="false" label-width="100px" class="filter-form">
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="基金公司">
              <el-input v-model="searchText" placeholder="请输入基金公司名称" clearable size="small" class="filter-input" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设立日期">
              <el-radio-group v-model="selected.date" size="small" class="nowrap-group">
                <el-radio-button v-for="item in dateOptions" :key="item" :label="item">{{ item }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册资本">
              <el-radio-group v-model="selected.capital" size="small" class="nowrap-group">
                <el-radio-button v-for="item in capitalOptions" :key="item" :label="item">{{ item }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="股东结构">
              <el-radio-group v-model="selected.structure" size="small" class="nowrap-group">
                <el-radio-button v-for="item in structureOptions" :key="item" :label="item">{{ item }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="特色因子">
              <el-button type="warning" size="small" style="font-weight:600;letter-spacing:1px;">优品特色因子</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效资产规模">
              <el-radio-group v-model="selected.asset" size="small" class="nowrap-group">
                <el-radio-button v-for="item in assetOptions" :key="item" :label="item">{{ item }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权益类收益率">
              <el-radio-group v-model="selected.equityReturn" size="small" class="nowrap-group">
                <el-radio-button v-for="item in equityReturnOptions" :key="item" :label="item">{{ item }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="债权类收益率">
              <el-radio-group v-model="selected.bondReturn" size="small" class="nowrap-group">
                <el-radio-button v-for="item in bondReturnOptions" :key="item" :label="item">{{ item }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right; margin-top: 8px;">
            <el-form-item>
              <el-button type="primary" @click="onFilter" size="small">确定</el-button>
              <el-button @click="onClear" size="small">清除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 表格区 -->
    <el-card class="table-card" shadow="never">
      <el-table :data="tableData" border stripe size="small" style="width: 100%;">
        <el-table-column prop="companyName" label="基金公司" />
        <el-table-column prop="establishmentDate" label="设立日期" />
        <el-table-column prop="registeredCapital" label="注册资本(亿元)" />
        <el-table-column prop="firstFundDate" label="首只基金成立日期" />
        <el-table-column prop="managerCount" label="基金管理人数量" />
        <el-table-column prop="fundCount" label="基金个数(个)" />
        <el-table-column prop="effectiveAssets" label="有效资产规模(亿)" />
        <el-table-column prop="equityCapital" label="权益资本(亿)" />
        <el-table-column prop="equityReturn" label="权益类基金历史收益率" />
        <el-table-column prop="bondReturn" label="债权类基金历史收益率" />
      </el-table>
    </el-card>
    <div class="table-pagination">
      <el-pagination
        background
        layout="prev, pager, next, sizes, jumper"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const searchText = ref('')
const dateOptions = ['5-10年', '3-5年', '1年以内']
const capitalOptions = ['100亿以上', '80-100亿', '50-80亿', '30-50亿']
const structureOptions = ['100亿以上', '80-100亿', '50-80亿', '30-50亿']
const assetOptions = ['100亿以上', '80-100亿', '50-80亿', '30-50亿']
const equityReturnOptions = ['大于200%', '100%-200%', '50%-100%', '50%以下']
const bondReturnOptions = ['大于200%', '100%-200%', '50%-100%', '50%以下']

const selected = ref({
  date: '',
  capital: '',
  structure: '',
  asset: '',
  equityReturn: '',
  bondReturn: ''
})

const tableData = ref([
  {
    companyName: '易方达基金',
    establishmentDate: '2018-09-03',
    registeredCapital: 130,
    firstFundDate: '2018-09-03',
    managerCount: 150,
    fundCount: 85,
    effectiveAssets: 875,
    equityCapital: 1000,
    equityReturn: '34.48%',
    bondReturn: '34.48%'
  },
  // 可添加更多 mock 数据
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

function getMinMaxByLabel(label: string) {
  if (!label) return { min: undefined, max: undefined }
  if (label.includes('以上')) {
    return { min: parseFloat(label), max: undefined }
  }
  if (label.includes('以下')) {
    return { min: undefined, max: parseFloat(label) }
  }
  if (label.includes('-')) {
    const [min, max] = label.replace(/[^\d.-]/g, '').split('-')
    return { min: parseFloat(min), max: parseFloat(max) }
  }
  return { min: undefined, max: undefined }
}

async function onSearch() {
  const assetRange = getMinMaxByLabel(selected.value.asset)
  const equityRange = getMinMaxByLabel(selected.value.equityReturn)
  const bondRange = getMinMaxByLabel(selected.value.bondReturn)

  const params: Record<string, unknown> = {
    page: currentPage.value,
    pageSize: pageSize.value
  }
  if (searchText.value) params.companyName = searchText.value
  if (assetRange.min !== undefined) params.minEffectiveAssets = assetRange.min
  if (assetRange.max !== undefined) params.maxEffectiveAssets = assetRange.max
  if (equityRange.min !== undefined) params.minEquityReturn = equityRange.min
  if (equityRange.max !== undefined) params.maxEquityReturn = equityRange.max
  if (bondRange.min !== undefined) params.minBondReturn = bondRange.min
  if (bondRange.max !== undefined) params.maxBondReturn = bondRange.max

  try {
    console.log('公司查询参数', params)
    const res = await axios.post('http://localhost:8080/api/fund-companies/query', params, {
      headers: { 'Content-Type': 'application/json' }
    })
    console.log(res);
    tableData.value = res.data.list
    total.value = res.data.total
  } catch (e) {
    console.error(e)
  }
}

function onFilter() {
  onSearch();
}

function onClear() {
  searchText.value = ''
  selected.value = {
    date: '',
    capital: '',
    structure: '',
    asset: '',
    equityReturn: '',
    bondReturn: ''
  }
}

function handleSizeChange(size: number) {
  pageSize.value = size;
  onSearch();
}

function handlePageChange(page: number) {
  currentPage.value = page;
  onSearch();
}

onMounted(() => {
  onSearch()
})
</script>

<style scoped>
:root {
  --primary-blue: #223354;
  --secondary-blue: #1A233A;
  --background-gray: #F5F7FA;
  --card-bg: #fff;
  --up-color: #2FC25B;
  --down-color: #F04864;
  --highlight-color: #F6C659;
  --table-header-bg: #e9edf3;
  --table-header-color: #223354;
}
body {
  font-family: '微软雅黑', '思源黑体', 'PingFang SC', 'Roboto', sans-serif;
  background: var(--background-gray);
  color: var(--primary-blue);
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
}
.main-inner-card, .table-card, .filter-card {
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
.main-inner-card {
  background: var(--card-bg);
  border-radius: 14px;
  box-shadow: 0 4px 24px 0 rgba(34,51,84,0.10);
  padding: 32px 24px 32px 24px;
  margin-bottom: 32px;
  transition: box-shadow 0.3s;
  border: 1.5px solid #e0e6f0;
}
.fund-company-filter-table {
  width: 100%;
}
.filter-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(34,51,84,0.08);
  border: 1.5px solid #dbe3ef;
  background: #f7f9fa;
  padding-bottom: 0;
  transition: box-shadow 0.3s;
}
.filter-card:hover {
  box-shadow: 0 6px 24px 0 rgba(34,51,84,0.13);
}
.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 32px;
  align-items: flex-end;
}
.el-form-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.el-form-item__label {
  min-width: 90px;
  max-width: 120px;
  color: var(--primary-blue);
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-form-item__content {
  flex: 1 1 1800px;
  max-width: 2000px;
  min-width: 0;
  white-space: nowrap;
  overflow-x: auto;
  display: flex;
  align-items: center;
  gap: 0 8px;
}
.filter-input {
  width: 200px;
  border-radius: 6px;
  border: 1.5px solid #bfc8da;
  background: #fff;
  color: var(--primary-blue);
  transition: border 0.2s;
}
.filter-input:focus {
  border: 1.5px solid var(--primary-blue);
}
.nowrap-group {
  flex-wrap: nowrap !important;
  white-space: nowrap;
}
.more-link {
  margin-left: 0;
}
.table-card {
  margin-top: 0;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(34,51,84,0.08);
  border: 1.5px solid #e0e6f0;
  background: #fff;
  transition: box-shadow 0.3s;
}
.table-card:hover {
  box-shadow: 0 8px 32px 0 rgba(34,51,84,0.13);
}
.el-table th {
  background: var(--table-header-bg) !important;
  font-weight: 700;
  color: var(--table-header-color);
  font-size: 15px;
  border-bottom: 2px solid #dbe3ef;
}
.el-table td {
  font-size: 14px;
  color: var(--primary-blue);
}
.el-table__row:hover {
  background: #eaf3ff !important;
}
.el-table .up {
  color: var(--up-color);
  font-weight: 600;
}
.el-table .down {
  color: var(--down-color);
  font-weight: 600;
}
.el-table .highlight {
  color: var(--highlight-color);
  font-weight: 700;
}
.el-button[type="primary"] {
  background: var(--primary-blue) !important;
  color: #fff !important;
  border: 2px solid var(--highlight-color) !important;
  font-size: 16px;
  height: 38px;
  min-width: 90px;
  box-shadow: 0 2px 8px 0 rgba(34,51,84,0.10);
  font-weight: 700;
  letter-spacing: 2px;
  transition: background 0.2s, border 0.2s, box-shadow 0.2s;
}
.el-button[type="primary"]:hover {
  background: #2a4370 !important;
  border-color: #ffd700 !important;
  box-shadow: 0 4px 16px 0 rgba(246,198,89,0.18);
}
.el-button:not([type="primary"]) {
  background: #f5f7fa !important;
  color: var(--primary-blue) !important;
  border: 2px solid var(--primary-blue) !important;
  font-size: 16px;
  height: 38px;
  min-width: 90px;
  font-weight: 700;
  letter-spacing: 2px;
  margin-left: 12px;
  transition: background 0.2s, border 0.2s;
}
.el-button:not([type="primary"]):hover {
  background: #e9edf3 !important;
  border-color: var(--highlight-color) !important;
}
.el-button {
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.2s, background 0.2s, transform 0.1s;
}
.el-button:active {
  transform: scale(0.96);
  box-shadow: 0 0 0 2px var(--highlight-color);
}
.el-button::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  background: rgba(246,198,89,0.25);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  pointer-events: none;
  transition: width 0.4s, height 0.4s, opacity 0.4s;
}
.el-button:active::after {
  width: 120px;
  height: 120px;
  opacity: 1;
  transition: 0s;
}
.el-link {
  font-weight: 500;
  color: var(--primary-blue);
}
.el-link:hover {
  color: var(--highlight-color);
}
@media (max-width: 900px) {
  .main-inner-card {
    padding: 16px 4px 16px 4px;
  }
  .filter-form {
    gap: 8px 8px;
  }
  .filter-input {
    width: 120px;
  }
  .el-form-item__label {
    min-width: 80px;
    font-size: 13px;
  }
  .el-table th, .el-table td {
    font-size: 12px;
  }
}
.table-pagination {
  margin-top: 16px;
}
</style>
