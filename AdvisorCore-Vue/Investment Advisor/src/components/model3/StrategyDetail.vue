<!-- 5.1 -->
<template>
  <div class="strategy-detail-view">
    <!-- 基本信息 -->
    <div class="section-title">基本信息</div>
    <table class="info-table">
      <thead>
        <tr>
          <th>策略名称</th>
          <th>资产规模（亿）</th>
          <th>成份基金（只）</th>
          <th>费率（%）</th>
          <th>运行时间</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>精选消费价值策略</td>
          <td>2000</td>
          <td>3</td>
          <td>0.15</td>
          <td>2020-01-20</td>
        </tr>
      </tbody>
    </table>
    <!-- 持仓列表 -->
    <div class="section-title">持仓列表</div>
    <table class="hold-table">
      <thead>
        <tr>
          <th>编号</th>
          <th>基金名称</th>
          <th>基金代码</th>
          <th>资产配置占比（%）</th>
          <th>持仓份额（份）</th>
          <th>基金金额（份）</th>
          <th>累计申购（次）</th>
          <th>申购次数（次）</th>
          <th>赎回次数（次）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>基金消费1</td>
          <td>000023</td>
          <td>20</td>
          <td>400</td>
          <td>400</td>
          <td>2</td>
          <td>2</td>
          <td>0</td>
        </tr>
        <tr>
          <td>2</td>
          <td>基金消费2</td>
          <td>000021</td>
          <td>45</td>
          <td>800</td>
          <td>800</td>
          <td>3</td>
          <td>3</td>
          <td>0</td>
        </tr>
        <tr>
          <td>3</td>
          <td>基金消费3</td>
          <td>000032</td>
          <td>35</td>
          <td>600</td>
          <td>600</td>
          <td>1</td>
          <td>1</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
    <!-- 策略收益概况和组合持仓 -->
    <div class="flex-row">
      <div class="profit-summary">
        <div class="section-title">策略收益概况</div>
        <div class="profit-row">
          <div>账户总收益 <span class="profit-num">10.20%</span></div>
          <div>总盈亏 <span class="profit-num">20000.0</span></div>
          <div>今日盈亏 <span class="profit-num">2000.0</span></div>
          <div>年化收益率 <span class="profit-num">10.20%</span></div>
          <div>近一个月收益率 <span class="profit-num">20.09%</span></div>
          <div>最大回撤 <span class="profit-num">20.09%</span></div>
        </div>
        <div ref="lineChart" class="line-chart"></div>
      </div>
      <div class="hold-pie">
        <div class="section-title">组合持仓</div>
        <div ref="pieChart" class="pie-chart"></div>
        <div class="pie-legend">
          <div><span class="legend-dot" style="background:#f39c12;color:#222"></span>现金</div>
          <div><span class="legend-dot" style="background:#3498db;color:#222"></span>基金消费1</div>
          <div><span class="legend-dot" style="background:#e74c3c;color:#222"></span>基金消费2</div>
          <div><span class="legend-dot" style="background:#2ecc71;color:#222 "></span>基金消费3</div>
        </div>
      </div>
    </div>
    <!-- 订单明细 -->
    <div class="section-title">订单明细</div>
    <table class="order-table">
      <thead>
        <tr>
          <th>基金代码</th>
          <th>基金名称</th>
          <th>委托时间</th>
          <th>交易方向</th>
          <th>状态</th>
          <th>购买金额（万）</th>
          <th>赎回份额（份）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>000001</td>
          <td>基金消费1</td>
          <td>2019-10-02 10:32</td>
          <td>申购</td>
          <td>份额确认</td>
          <td>6000</td>
          <td>-</td>
        </tr>
        <tr>
          <td>620190</td>
          <td>基金消费2</td>
          <td>2019-10-12 10:32</td>
          <td>赎回</td>
          <td>已报</td>
          <td>-</td>
          <td>30000</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
const pieChart = ref(null)
const lineChart = ref(null)
const pieData = [
  { value: 40, name: '现金', itemStyle: { color: '#f39c12' } },
  { value: 20, name: '基金消费1', itemStyle: { color: '#3498db' } },
  { value: 20, name: '基金消费2', itemStyle: { color: '#e74c3c' } },
  { value: 20, name: '基金消费3', itemStyle: { color: '#2ecc71' } }
]
const lineOption = {
  tooltip: { trigger: 'axis' },
  legend: { data: ['沪深300', '我的策略'] },
  xAxis: { type: 'category', data: ['2019/10/12', '2019/10/24', '2019/11/07'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '沪深300',
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
      name: '我的策略',
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
}
onMounted(() => {
  if (pieChart.value) {
    echarts.init(pieChart.value).setOption({
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'right' },
      series: [
        {
          name: '组合持仓',
          type: 'pie',
          radius: ['60%', '80%'],
          center: ['50%', '50%'],
          data: pieData,
          label: { formatter: '{b} {d}%', fontSize: 14 },
          labelLine: { length: 18, length2: 10 }
        }
      ]
    })
  }
  if (lineChart.value) {
    echarts.init(lineChart.value).setOption(lineOption)
  }
})
</script>

<style scoped>
.strategy-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0;
}
.section-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin: 18px 0 8px 0;
  text-decoration: underline;
  cursor: pointer;
}
.info-table, .hold-table, .order-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.info-table th, .info-table td,
.hold-table th, .hold-table td,
.order-table th, .order-table td {
  border: 1px solid #bbb;
  padding: 8px 12px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.info-table th, .hold-table th, .order-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.hold-table .highlight, .order-table .highlight {
  background: #eaf2ff;
}
.flex-row {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
}
.profit-summary {
  flex: 2;
}
.hold-pie {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pie-chart {
  width: 180px;
  height: 180px;
  margin: 0 auto 12px auto;
}
.pie-legend {
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-top: 8px;
}
.legend-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
}
.profit-row {
  color: #000;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 12px;
}
.profit-num {
  color: #e74c3c;
  font-weight: bold;
  margin-left: 4px;
}
.line-chart {
  width: 100%;
  height: 220px;
  margin-top: 8px;
  background: #fff;
}
</style> 