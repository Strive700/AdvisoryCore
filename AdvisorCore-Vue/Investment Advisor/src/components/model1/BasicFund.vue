<template>
  <div class="main-inner-card fund-filter-table">
    <!-- 筛选区 -->
    <el-card class="filter-card" shadow="never">
      <el-form :inline="false" label-width="100px" class="filter-form">
        <el-row :gutter="32">
          <el-col :span="12">
            <el-form-item label="基金代码">
              <el-input v-model="filters.code" placeholder="请输入基金代码" clearable size="small" class="filter-input" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基金成立时间">
              <el-radio-group v-model="filters.time" size="small" class="nowrap-group">
                <el-radio-button v-for="opt in filterOptions[0].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="基金规模">
              <el-radio-group v-model="filters.scale" size="small" class="nowrap-group">
                <el-radio-button v-for="opt in filterOptions[1].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经理任职年限">
              <el-radio-group v-model="filters.managerYear" size="small" class="nowrap-group">
                <el-radio-button v-for="opt in filterOptions[3].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="今年收益率">
              <el-radio-group v-model="filters.ytdReturn" size="small" class="nowrap-group">
                <el-radio-button v-for="opt in filterOptions[2].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理费率">
              <el-radio-group v-model="filters.fee" size="small" class="nowrap-group">
                <el-radio-button v-for="opt in filterOptions[4].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Barra风格归因">
              <el-radio-group v-model="filters.barra" size="small" class="nowrap-group">
                <el-radio-button v-for="opt in filterOptions[5].options" :key="opt" :label="opt">{{ opt }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: right; margin-top: 8px;">
            <el-form-item>
              <el-button type="primary" size="small" @click="onSearch">确定</el-button>
              <el-button size="small" @click="onReset">清除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 表格区 -->
    <el-card class="table-card" shadow="never">
      <el-table :data="tableData" border stripe size="small">
        <el-table-column prop="fundCode" label="基金代码" width="100" />
        <el-table-column prop="fundName" label="基金简称" width="180">
          <template #default="scope">
            <el-link type="primary" @click="goToDetail(scope.row.fundCode)">{{ scope.row.fundName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="managerName" label="基金经理" width="100" />
        <el-table-column prop="fundType" label="基金类型" width="80" />
        <el-table-column prop="unitNav" label="最新净值(元)" width="120" />
        <el-table-column prop="navDate" label="最新净值日期" width="120" />
        <el-table-column prop="return1m" label="近一月收益率" width="120" />
        <el-table-column prop="returnYtd" label="今年以来收益率" width="120" />
        <el-table-column prop="maxDrawdown1y" label="近一年最大回撤" width="120" />
        <el-table-column prop="operationCycle" label="运行周期" width="80" />
        <el-table-column prop="fundSize" label="基金规模(亿元)" width="120" />
        <el-table-column prop="inceptionDate" label="成立日期" width="120" />
        <el-table-column prop="qualityScore" label="优品基金评分" width="120">
          <template #default="scope">
            <el-link type="primary">{{ scope.row.qualityScore }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="预警提示" width="200">
          <template #default="scope">
            <span v-if="scope.row.description">{{ scope.row.description }}</span>
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-link type="primary" @click="showFundImage(scope.row)">基金画像</el-link>
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

    <!-- 基金画像对话框 -->
    <el-dialog v-model="fundImageDialogVisible" title="基金画像" width="60%" @opened="onDialogOpened">
      <div v-if="fundImageData && Object.keys(fundImageData).length">
        <!-- 基本信息 -->
        <el-card class="mb-2">
          <div>基金名称：{{ fundImageData.fund_name }}</div>
          <div>基金代码：{{ fundImageData.fund_code }}</div>
          <div>基金类型：{{ fundImageData.fund_type }}</div>
          <div>基金规模：{{ fundImageData.fund_size }} 亿元</div>
          <div>基金经理：{{ fundImageData.manager_name }}</div>
          <div>成立日期：{{ fundImageData.inception_date }}</div>
          <div>运作周期：{{ fundImageData.operation_cycle }}</div>
          <div>行业标签：{{ fundImageData.industry_tag }}</div>
          <div>基金评级：{{ fundImageData.rating }}</div>
          <div>基金描述：{{ fundImageData.fund_description }}</div>
        </el-card>
        <!-- 核心指标 -->
        <el-card class="mb-2">
          <div>优品基金评分：{{ fundImageData.quality_score }}</div>
          <div>今年以来收益率：{{ fundImageData.return_ytd }}%</div>
          <div>近一月收益率：{{ fundImageData.return_1m }}%</div>
          <div>近一年最大回撤：{{ fundImageData.max_drawdown_1y }}%</div>
          <div>夏普比率：{{ fundImageData.annual_sharpe }}</div>
          <div>风险等级：{{ fundImageData.risk_level }}</div>
          <div>管理费率：{{ fundImageData.fee_rate }}</div>
          <div>排名：{{ fundImageData.ranking }}</div>
          <v-chart v-if="fundImageDialogVisible" :option="scoreBarOption" style="height:300px;" :ref="setChartRef" />
          <v-chart v-if="fundImageDialogVisible" :option="returnLineOption" style="height:300px; margin-top: 16px;" :ref="setChartRef" />
          <v-chart v-if="fundImageDialogVisible" :option="drawdownBarOption" style="height:300px; margin-top: 16px;" :ref="setChartRef" />
          <v-chart v-if="fundImageDialogVisible" :option="riskRadarOption" style="height:300px; margin-top: 16px;" :ref="setChartRef" />
        </el-card>
        <!-- 资产分布 -->
        <el-card class="mb-2">
          <div>资产分布：</div>
          <el-row>
            <el-col :span="6">股票：{{ fundImageData.stock_asset }}%</el-col>
            <el-col :span="6">债券：{{ fundImageData.bond_asset }}%</el-col>
            <el-col :span="6">现金：{{ fundImageData.cash_asset }}%</el-col>
            <el-col :span="6">存款：{{ fundImageData.deposit_asset }}%</el-col>
          </el-row>
          <v-chart v-if="fundImageDialogVisible" :option="assetPieOption" style="height:300px;" :ref="setChartRef" />
        </el-card>
        <!-- 其它指标 -->
        <el-card class="mb-2">
          <div>累计净值：{{ fundImageData.accumulated_nav }}</div>
          <div>单位净值：{{ fundImageData.unit_nav }}</div>
          <div>净值日期：{{ fundImageData.nav_date }}</div>
          <div>最新披露日期：{{ fundImageData.disclosure_date }}</div>
          <div>市场价值：{{ fundImageData.market_value }}</div>
          <div>持仓股票：{{ fundImageData.stock_name }} ({{ fundImageData.stock_code }})</div>
          <div>持仓份额：{{ fundImageData.share_count }}</div>
          <div>总份额：{{ fundImageData.share_total }}</div>
        </el-card>
      </div>
      <div v-else>
        暂无数据
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
// ECharts 依赖全量引入
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart, RadarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, RadarComponent } from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  PieChart,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  RadarComponent
])

const router = useRouter()

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
  { label: '今年以来收益率:', key: 'ytdReturn', options: ['大于20%', '10%~20%', '0%~10%', '小于0%'] },
  { label: '经理任职年限:', key: 'managerYear', options: ['100亿以上', '80-100亿', '50-80亿', '30-50亿'] },
  { label: '管理费率:', key: 'fee', options: ['小于0.5%', '0.5%~1%', '1%~1.5%', '大于1.5%'] },
  { label: 'Barra风格归因:', key: 'barra', options: ['价值型', '成长型', '大盘股', '小盘股', '动量型', '防御型'] }
]

const tableData = ref([
  {
    fundCode: '000001',
    fundName: '华夏成长混合',
    fundSize: 120.5,
    fundType: '混合型',
    inceptionDate: '2010-06-01',
    managerName: '张伟',
    maxDrawdown1y: -5.6,
    navDate: '2025-06-28',
    operationCycle: '开放式',
    qualityScore: 88,
    return1m: 2.1,
    returnYtd: 15.4,
    unitNav: 1.523
  }
  // ...可添加更多模拟数据
])

const total = ref(50)
const pageSize = ref(10)
const currentPage = ref(1)

interface FundImageData {
  fund_name?: string;
  fund_code?: string;
  fund_type?: string;
  fund_size?: number;
  manager_name?: string;
  inception_date?: string;
  operation_cycle?: string;
  industry_tag?: string;
  rating?: string;
  fund_description?: string;
  quality_score?: number;
  research_score?: number;
  risk_adj_score?: number;
  tenure_score?: number;
  return_ytd?: number;
  return_1m?: number;
  max_drawdown_1y?: number;
  annual_sharpe?: number;
  risk_level?: string;
  fee_rate?: number;
  ranking?: number;
  stock_asset?: number;
  bond_asset?: number;
  cash_asset?: number;
  deposit_asset?: number;
  accumulated_nav?: number;
  unit_nav?: number;
  nav_date?: string;
  disclosure_date?: string;
  market_value?: number;
  stock_name?: string;
  stock_code?: string;
  share_count?: number;
  share_total?: number;
}

const fundImageData = ref<FundImageData>({})

const fundImageDialogVisible = ref(false)

// 图表ref数组
const chartRefs = ref<any[]>([])

function onDialogOpened() {
  // 等待DOM渲染后强制resize所有图表
  nextTick(() => {
    chartRefs.value.forEach((chart: any) => {
      if (chart && chart.resize) chart.resize()
    })
  })
}

function setChartRef(el: any) {
  if (el && !chartRefs.value.includes(el)) {
    chartRefs.value.push(el)
  }
}

// 工具函数：根据选项转区间
function getRangeByLabel(label: string) {
  // 你需要根据实际选项内容来写映射
  // 例如：'100亿以上' => { min: 100, max: null }
  if (!label) return null;
  if (label.includes('以上')) {
    return { min: parseFloat(label), max: null };
  }
  if (label.includes('以下')) {
    return { min: null, max: parseFloat(label) };
  }
  if (label.includes('-')) {
    const [min, max] = label.replace('亿', '').split('-');
    return { min: parseFloat(min), max: parseFloat(max) };
  }
  return null;
}

const onSearch = async () => {
  // 组装请求参数
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    scale: getRangeByLabel(filters.value.scale),
    managerTenure: getRangeByLabel(filters.value.managerYear),
    yieldThisYear: getRangeByLabel(filters.value.ytdReturn),
    feeRate: getRangeByLabel(filters.value.fee),
    styleTag: filters.value.barra || '',
    code: filters.value.code || ''
  }
  try {
    console.log(params)
    const res = await axios.post('http://localhost:8080/api/funds/queryWithJoin', params, {
      headers: { 'Content-Type': 'application/json' }
    })
    console.log(res);
    tableData.value = res.data.data.records
    total.value = res.data.data.total
  } catch (e) {
    // 错误处理
    console.error(e)
  }
}
const onReset = () => {
  filters.value = { code: '', time: '', scale: '', managerYear: '', ytdReturn: '', fee: '', barra: '' }
}
const handleSizeChange = (size: number) => {
  pageSize.value = size
  onSearch()
}
const handlePageChange = (page: number) => {
  currentPage.value = page
  onSearch()
}
const goToDetail = (code: string) => {
  router.push(`/fund-detail/${code}`)
}
const showFundImage = async (row: any) => {
  // 你可以只传 code 或其他唯一标识
  const params = { fund_code: row.fundCode }
  try {
    console.log(params)
    const res = await axios.post('http://localhost:8080/api/funds/Fund_Image', params)
    console.log(res)
    const code = row.fundCode
    fundImageData.value = res.data[code] // 只取当前基金的详细信息
    fundImageDialogVisible.value = true
  } catch (e) {
    // 错误处理
    console.error(e)
  }
}


// 资产分布饼图
const assetPieOption = computed(() => ({
  title: { text: '资产分布', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [
    {
      name: '资产分布',
      type: 'pie',
      radius: '50%',
      data: [
        { value: Number(fundImageData.value.stock_asset ?? 0), name: '股票' },
        { value: Number(fundImageData.value.bond_asset ?? 0), name: '债券' },
        { value: Number(fundImageData.value.cash_asset ?? 0), name: '现金' },
        { value: Number(fundImageData.value.deposit_asset ?? 0), name: '存款' }
      ].filter(item => !isNaN(item.value)),
      emphasis: {
        itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
      }
    }
  ]
}))

// 核心评分柱状图
const scoreBarOption = computed(() => ({
  title: { text: '核心评分', left: 'center' },
  xAxis: { type: 'category', data: ['优品评分', '研究评分', '风险调整', '任职评分'] },
  yAxis: { type: 'value' },
  series: [
    {
      data: [
        fundImageData.value.quality_score,
        fundImageData.value.research_score,
        fundImageData.value.risk_adj_score,
        fundImageData.value.tenure_score
      ],
      type: 'bar'
    }
  ]
}))

// 收益率折线图
const returnLineOption = computed(() => ({
  title: { text: '收益率', left: 'center' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['今年以来', '近一月'] },
  yAxis: { type: 'value' },
  series: [
    {
      data: [
        fundImageData.value.return_ytd,
        fundImageData.value.return_1m
      ],
      type: 'line',
      smooth: true
    }
  ]
}))

// 最大回撤柱状图
const drawdownBarOption = computed(() => ({
  title: { text: '最大回撤', left: 'center' },
  xAxis: { type: 'category', data: ['近一年最大回撤'] },
  yAxis: { type: 'value' },
  series: [
    {
      data: [
        fundImageData.value.max_drawdown_1y !== undefined && !isNaN(fundImageData.value.max_drawdown_1y)
          ? Math.abs(fundImageData.value.max_drawdown_1y) : 0
      ],
      type: 'bar',
      itemStyle: { color: '#f56c6c' }
    }
  ]
}))

// 风险雷达图
const riskRadarOption = computed(() => ({
  title: { text: '风险与收益雷达图', left: 'center' },
  radar: {
    indicator: [
      { name: '优品评分', max: 100 },
      { name: '收益率', max: 100 },
      { name: '最大回撤', max: 100 },
      { name: '夏普比率', max: 5 },
      { name: '管理费率', max: 5 }
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [
            Number(fundImageData.value.quality_score ?? 0) || 0,
            Number(fundImageData.value.return_ytd ?? 0) || 0,
            Math.abs(Number(fundImageData.value.max_drawdown_1y ?? 0) || 0),
            Number(fundImageData.value.annual_sharpe ?? 0) || 0,
            Number(fundImageData.value.fee_rate ?? 0) || 0
          ],
          name: '风险与收益'
        }
      ]
    }
  ]
}))

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
.main-inner-card {
  background: var(--card-bg);
  border-radius: 14px;
  box-shadow: 0 4px 24px 0 rgba(34,51,84,0.10);
  padding: 32px 24px 32px 24px;
  margin-bottom: 32px;
  transition: box-shadow 0.3s;
  border: 1.5px solid #e0e6f0;
}
.fund-filter-table {
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
  flex: 1 1 1100px;
  max-width: 1400px;
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
.table-pagination {
  margin: 20px 0 0 0;
  text-align: right;
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

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: none; }
}
.main-inner-card, .table-card, .filter-card {
  animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

/* 按钮波纹和缩放反馈 */
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
</style>
