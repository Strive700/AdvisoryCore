<template>
  <div class="factor-analysis-view">
    <!-- 顶部操作区 -->
    <div class="top-bar">
      <el-button type="primary" icon="Plus" style="margin-right: 16px;">创建衍生因子</el-button>
      <el-select v-model="selectedFactor" placeholder="请选择" style="width: 200px; margin-right: 16px;">
        <el-option v-for="item in factorOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-input v-model="inputCode" placeholder="基金代码" style="width: 140px; margin-right: 8px;" />
      <el-date-picker v-model="dateRange" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" style="margin-right: 8px;" />
      <el-button type="primary">查询</el-button>
    </div>

    <el-row :gutter="16" style="margin-top: 16px;">
      <!-- 左侧树形菜单 -->
      <el-col :span="5">
        <el-card>
          <el-tree
            :data="treeData"
            :props="treeProps"
            node-key="id"
            default-expand-all
            highlight-current
            style="min-height: 400px;"
          />
        </el-card>
      </el-col>
      <!-- 中间表格 -->
      <el-col :span="7">
        <el-card>
          <div class="table-title">易方达天天理财货币A</div>
          <el-table :data="tableData" height="400" size="small">
            <el-table-column prop="date" label="发生时间" width="120" />
            <el-table-column prop="value" label="数值" />
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧折线图 -->
      <el-col :span="12">
        <el-card>
          <v-chart class="chart" :option="lineOption" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <div class="pagination-bar">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="3"
        :page-size="10"
        :current-page="1"
        :page-sizes="[10, 20, 50]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, MarkPointComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkPointComponent
])

const selectedFactor = ref('')
const factorOptions = [
  { label: 'TOT_SHARE', value: 'TOT_SHARE' },
  { label: '管理费率', value: '管理费率' }
]
const inputCode = ref('000001.CS')
const dateRange = ref(['1999-01-01', '2019-01-21'])

const treeData = [
  {
    id: 1,
    label: '费率水平',
    children: [
      { id: 11, label: '管理费率' },
      { id: 12, label: '运作费率' },
      { id: 13, label: '托管费率' }
    ]
  },
  {
    id: 2,
    label: '规模与仓位',
    children: [
      {
        id: 21,
        label: '最新规模',
        children: [
          { id: 211, label: '最新规模' },
          { id: 212, label: '最新份额' },
          { id: 213, label: '最新仓位' }
        ]
      },
      { id: 22, label: '近期平均规模(近四期)' },
      { id: 23, label: '近期平均份额(近四期)' },
      { id: 24, label: '近期平均仓位(近四期)' },
      { id: 25, label: '历史最大规模' },
      { id: 26, label: '历史最大份额' }
    ]
  }
]
const treeProps = { children: 'children', label: 'label' }

const tableData = ref([
  { date: '1999-06-30', value: 1551847002 },
  { date: '2000-06-30', value: 1551847002 },
  { date: '2001-06-30', value: 1945822149 }
])

const lineOption = ref({
  tooltip: { trigger: 'axis' },
  legend: { data: ['累计净值', '单位净值'] },
  xAxis: { type: 'category', data: ['2019/10/12', '2019/10/24', '2019/11/07'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '累计净值',
      type: 'line',
      data: [2, 6, 10],
      smooth: true,
      markPoint: {
        data: [
          { type: 'min', name: '最小值', symbol: 'circle', itemStyle: { color: 'green' } },
          { coord: [1, 6], symbol: 'circle', itemStyle: { color: 'red' } },
          { coord: [2, 10], symbol: 'circle', itemStyle: { color: 'red' } }
        ]
      }
    },
    {
      name: '单位净值',
      type: 'line',
      data: [1, 5, 8],
      smooth: true,
      markPoint: {
        data: [
          { coord: [1, 5], symbol: 'circle', itemStyle: { color: 'red' } },
          { coord: [2, 8], symbol: 'circle', itemStyle: { color: 'red' } }
        ]
      }
    }
  ]
})
</script>

<style scoped>
.factor-analysis-view {
  padding: 0;
}
.top-bar {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.table-title {
  font-weight: 600;
  margin-bottom: 8px;
}
.chart {
  width: 100%;
  height: 400px;
}
.pagination-bar {
  margin-top: 16px;
  text-align: right;
}
</style> 