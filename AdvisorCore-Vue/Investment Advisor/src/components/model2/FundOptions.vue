<template>
  <div class="main-inner-card fund-options-table">
    <!-- 筛选区 -->
    <el-card class="filter-card" shadow="never">
      <el-form :inline="false" label-width="120px" class="filter-form">
        <el-form-item label="基金代码">
          <el-input v-model="filters.code" placeholder="请输入基金代码" clearable size="small" class="filter-input" />
        </el-form-item>
        <el-form-item label="基金成立时间">
          <el-radio-group v-model="filters.time" size="small" class="nowrap-group">
            <el-radio-button v-for="opt in filterOptions[0].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="基金规模">
          <el-radio-group v-model="filters.scale" size="small" class="nowrap-group">
            <el-radio-button v-for="opt in filterOptions[1].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="基金经理任职年限">
          <el-radio-group v-model="filters.managerYear" size="small" class="nowrap-group">
            <el-radio-button v-for="opt in filterOptions[2].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="今年以来收益率">
          <el-radio-group v-model="filters.ytdReturn" size="small" class="nowrap-group">
            <el-radio-button v-for="opt in filterOptions[3].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="管理费率">
          <el-radio-group v-model="filters.fee" size="small" class="nowrap-group">
            <el-radio-button v-for="opt in filterOptions[4].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Barra风格归因">
          <el-radio-group v-model="filters.barra" size="small" class="nowrap-group">
            <el-radio-button v-for="opt in filterOptions[5].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">确定</el-button>
          <el-button size="small" @click="onReset">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格区 -->
    <el-card class="table-card" shadow="never" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-text="加载中...">
      <el-table :data="tableData" border stripe size="small">
        <el-table-column prop="description" label="预警提示" width="120" />
        <el-table-column prop="code" label="基金代码" width="100" />
        <el-table-column prop="name" label="基金简称" width="180">
          <template #default="scope">
            <el-link type="primary">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="manager" label="基金经理" width="100" />
        <el-table-column prop="type" label="基金类型" width="80" />
        <el-table-column prop="nav" label="最新净值(元)" width="120" />
        <el-table-column prop="navDate" label="最新净值日期" width="120" />
        <el-table-column prop="monthReturn" label="近一月收益率" width="120" />
        <el-table-column prop="ytdReturn" label="今年以来收益率" width="120" />
        <el-table-column prop="maxDrawdown" label="近一年最大回撤" width="120" />
        <el-table-column prop="period" label="运行周期" width="80" />
        <el-table-column prop="scale" label="基金规模(亿元)" width="120" />
        <el-table-column prop="establishDate" label="成立日期" width="120" />
        <el-table-column prop="score" label="优品基金评分" width="120">
          <template #default="scope">
            <el-link type="primary">{{ scope.row.score }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="{ row }">
            <el-link type="primary" @click="handleDelete(row)">删除</el-link>
            <el-divider direction="vertical" />
            <el-link type="success" @click="openAlertDialog(row)">设置预警参数</el-link>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
  </div>

  <!-- 设置预警参数弹窗 -->
  <el-dialog v-model="alertDialogVisible" title="预警参数设置" width="900px" @close="closeAlertDialog">
    <el-table :data="alertParams" border style="margin-bottom: 0;">
      <el-table-column label="参数名称" width="140">
        <template #default="{ row }">
          <el-select v-model="row.paramName" placeholder="请选择" style="width: 120px">
            <el-option label="回撤率" value="回撤率" />
            <el-option label="晨星评级" value="晨星评级" />
            <el-option label="优品基金评级" value="优品基金评级" />
            <el-option label="波动率" value="波动率" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-select v-model="row.operator" placeholder="请选择" style="width: 80px">
            <el-option label=">=" value=">=" />
            <el-option label="<=" value="<=" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="阈值" width="120">
        <template #default="{ row }">
          <el-input v-model="row.threshold" placeholder="请输入" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="优先级" width="120">
        <template #default="{ row }">
          <el-select v-model="row.priority" placeholder="请选择" style="width: 100px">
            <el-option label="高" value="高" />
            <el-option label="中" value="中" />
            <el-option label="低" value="低" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="预警操作" width="140">
        <template #default="{ row }">
          <el-select v-model="row.action" placeholder="请选择" style="width: 120px">
            <el-option label="解除预警" value="解除预警" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="" width="160">
        <template #default="{ $index }">
          <el-button type="primary" size="small" @click="saveRow($index)">保存</el-button>
          <el-button type="danger" size="small" @click="deleteRow($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top:16px;">
      <el-button type="primary" @click="addRow">+ 添加预警参数设置</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const filters = ref({
  code: '',
  time: '',
  scale: '',
  managerYear: '',
  ytdReturn: '',
  fee: '',
  barra: ''
})

const filterOptions = [
  { label: '基金成立时间:', key: 'time', options: ['5-10年', '3-5年', '1-3年', '1年以内'] },
  { label: '基金规模:', key: 'scale', options: ['100亿以上', '80-100亿', '50-80亿', '30-50亿'] },
  { label: '基金经理任职年限:', key: 'managerYear', options: ['100亿以上', '80-100亿', '50-80亿', '30-50亿'] },
  { label: '今年以来收益率:', key: 'ytdReturn', options: ['5-10年', '3-5年', '1-3年', '1年以内'] },
  { label: '管理费率:', key: 'fee', options: ['100亿以上', '80-100亿', '50-80亿', '30-50亿'] },
  { label: 'Barra风格归因:', key: 'barra', options: ['100亿以上', '80-100亿', '50-80亿', '30-50亿'] }
]

// 定义表格行类型
interface FundRow {
  watchlistId: number
  alertTip: string
  code: string
  name: string
  manager: string
  type: string
  nav: number
  navDate: string
  monthReturn: string
  ytdReturn: string
  maxDrawdown: string
  period: string
  scale: number
  establishDate: string
  score: number
}

// 预警参数设置表格行类型
interface AlertParamRow {
  paramName: string      // alertParam
  operator: string       // 可选，后端没用到
  threshold: string      // threshold，需转为数字
  priority: string       // 可选，后端没用到
  action: string         // alertAction
  description?: string   // description
}

const tableData = ref<FundRow[]>([
  {
    watchlistId: 1,
    alertTip: '净值异常',
    code: '30300001',
    name: '易方达天天理财货币A',
    manager: '王小二',
    type: '指数型',
    nav: 1.001,
    navDate: '2020-02-15',
    monthReturn: '23.34%',
    ytdReturn: '34.48%',
    maxDrawdown: '-17.8%',
    period: '运行期',
    scale: 130,
    establishDate: '2018-09-03',
    score: 95
  },
  {
    watchlistId: 2,
    alertTip: '回撤超限',
    code: '30300002',
    name: '华夏成长混合',
    manager: '张三',
    type: '混合型',
    nav: 2.156,
    navDate: '2020-02-14',
    monthReturn: '15.67%',
    ytdReturn: '28.92%',
    maxDrawdown: '-12.3%',
    period: '运行期',
    scale: 85,
    establishDate: '2019-03-15',
    score: 88
  },
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 添加设置预警参数相关的变量
const alertDialogVisible = ref(false)
const alertParams = ref<AlertParamRow[]>([
  { paramName: '回撤率', operator: '>=', threshold: '50', priority: '高', action: '解除预警' },
  { paramName: '晨星评级', operator: '>=', threshold: '2', priority: '高', action: '解除预警' },
  { paramName: '优品基金评级', operator: '<=', threshold: '1', priority: '高', action: '解除预警' },
  { paramName: '波动率', operator: '<=', threshold: '40', priority: '高', action: '解除预警' }
])
const currentRow = ref<FundRow | null>(null)

const loading = ref(false)

async function onSearch() {
  loading.value = true
  try {
    const params = {
      ...filters.value,
      page: currentPage.value,
      pageSize: pageSize.value
    }
    const res = await axios.post('http://localhost:8080/api/fund-watchlist/alerts', params)
    console.log(res)
    if (res.data && res.data.data && res.data.data.length > 0) {
      tableData.value = res.data.data.map((item: Record<string, unknown>) => ({
        watchlistId:item.watchlistid,
        code: item.fund_code,
        name: item.fund_name,
        type: item.fund_type,
        nav: item.latest_nav,
        navDate: item.latest_nav_date,
        manager: item.manager_name,
        maxDrawdown: item.max_drawdown_1y,
        scale: item.fund_size,
        establishDate: item.inception_date,
        score: item.quality_score,
        monthReturn: item.return_1m,
        ytdReturn: item.return_ytd,
        description: item.description,
        period: item.operation_cycle,
        // 其它字段按需映射
      }))
      total.value = res.data.total || res.data.data.length
    } else {
      ElMessage.warning('后端无数据')
      tableData.value = []
      total.value = 0
    }
  } catch (e) {
    console.error('获取基金备选库失败', e)
    ElMessage.error('获取基金备选库失败')
    tableData.value = []
    total.value = 0
  }
  loading.value = false
}

function onReset() {
  filters.value = { code: '', time: '', scale: '', managerYear: '', ytdReturn: '', fee: '', barra: '' }
  onSearch() // 清空后自动刷新
}

function handleSizeChange(size: number) {
  pageSize.value = size
  onSearch()
}
function handlePageChange(page: number) {
  currentPage.value = page
  onSearch()
}

const handleDelete = async (row: FundRow) => {
  // 假设 row 里有 watchlistId 字段
  try {
    console.log('watchlistId:', row.watchlistId)
    console.log('删除URL:', `http://localhost:8080/api/fund-watchlist/${row.watchlistId}`)
    await axios.delete(`http://localhost:8080/api/fund-watchlist/${row.watchlistId}`)
    // 删除成功后刷新列表
    ElMessage.success('删除成功')
    onSearch() // 重新拉取数据
  } catch (e) {
    ElMessage.error('删除失败')
    console.error(e)
  }
}

const openAlertDialog = (row: FundRow) => {
  currentRow.value = row
  alertDialogVisible.value = true
  // 重置表单
  alertParams.value = [
    { paramName: '回撤率', operator: '>=', threshold: '50', priority: '高', action: '解除预警' },
    { paramName: '晨星评级', operator: '>=', threshold: '2', priority: '高', action: '解除预警' },
    { paramName: '优品基金评级', operator: '<=', threshold: '1', priority: '高', action: '解除预警' },
    { paramName: '波动率', operator: '<=', threshold: '40', priority: '高', action: '解除预警' }
  ]
}

const closeAlertDialog = () => {
  alertDialogVisible.value = false
}

function addRow() {
  alertParams.value.push({ paramName: '', operator: '', threshold: '', priority: '', action: '' })
}

function deleteRow(index: number) {
  alertParams.value.splice(index, 1)
}

async function saveRow(index: number) {
  const row = alertParams.value[index]
  const payload = {
    fundCode: currentRow.value?.code || '',
    alertParam: row.paramName,
    threshold: Number(row.threshold),
    alertAction: row.action,
    description: ''
  }
  try {
    await axios.post('http://localhost:8080/api/fund-alerts/set', payload)
    ElMessage.success('保存成功')
  } catch {
    ElMessage.error('保存失败')
  }
}

onMounted(() => {
  onSearch() // 页面加载自动查
})
</script>

<style scoped>
:root {
  --primary-blue: #223354;
  --background-gray: #F5F7FA;
  --card-bg: #fff;
  --highlight-color: #F6C659;
  --table-header-bg: #e9edf3;
  --table-header-color: #223354;
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
.fund-options-table {
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
  flex-direction: column;
  gap: 0;
}
.el-form-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.el-form-item__label {
  min-width: 120px;
  color: var(--primary-blue);
  font-weight: 600;
  font-size: 15px;
  white-space: nowrap;
}
.filter-input {
  width: 220px;
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
.table-pagination {
  margin: 16px 0 0 0;
  text-align: right;
}
</style>
