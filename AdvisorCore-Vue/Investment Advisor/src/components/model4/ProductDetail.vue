<template>
  <div class="product-detail-view">
    <!-- 基本信息 -->
    <div class="info-bar">
      <div class="info-title">基本信息</div>
      <div class="info-row">
        <span>组合名称：精选消费价值组合</span>
        <span>总资产：2.09亿</span>
        <span>成份基金数：3</span>
        <button class="buy-btn">申购</button>
        <button class="sell-btn">赎回</button>
      </div>
    </div>
    <div class="main-content">
      <div class="left-content">
        <div class="section-title">成份基金列表</div>
        <table class="hold-table">
          <thead>
            <tr>
              <th>编号</th>
              <th>基金名称</th>
              <th>基金代码</th>
              <th>当前市值（万）</th>
              <th>组合市值占比（%）</th>
              <th>申购次数（次）</th>
              <th>赎回次数（次）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>基金消费1</td>
              <td>000023</td>
              <td>100</td>
              <td>10</td>
              <td>2</td>
              <td>1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>基金消费2</td>
              <td>000021</td>
              <td>300</td>
              <td>15</td>
              <td>3</td>
              <td>1</td>
            </tr>
            <tr>
              <td>3</td>
              <td>基金消费3</td>
              <td>000032</td>
              <td>500</td>
              <td>30</td>
              <td>5</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
        <div class="section-title">组合收益概况</div>
        <div class="profit-row">
          <div>账户总收益 <span class="profit-num">10.20%</span></div>
          <div>年化收益率 <span class="profit-num">9.20%</span></div>
          <div>近一个月收益率 <span class="profit-num">1.09%</span></div>
          <div>最大回撤 <span class="profit-num">20.09%</span></div>
        </div>
        <div ref="lineChart" class="line-chart"></div>
      </div>
      <div class="right-content">
        <div class="section-title">组合持仓</div>
        <div ref="pieChart" class="pie-chart"></div>
        <div class="pie-legend">
          <div><span class="legend-dot" style="background:#f39c12"></span>现金</div>
          <div><span class="legend-dot" style="background:#3498db"></span>基金消费1</div>
          <div><span class="legend-dot" style="background:#e74c3c"></span>基金消费2</div>
          <div><span class="legend-dot" style="background:#2ecc71"></span>基金消费3</div>
        </div>
      </div>
    </div>
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
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>000001</td>
          <td>基金消费1</td>
          <td>2019-10-02 10:32</td>
          <td>买入</td>
          <td>份额确认</td>
          <td>6000</td>
          <td>--</td>
          <td><button class="cancel-btn">撤销</button></td>
        </tr>
        <tr>
          <td>620190</td>
          <td>基金消费2</td>
          <td>2019-10-12 10:32</td>
          <td>卖出</td>
          <td>已报</td>
          <td>--</td>
          <td>30000</td>
          <td><button class="cancel-btn">撤销</button></td>
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
  legend: { data: ['沪深300', '我的收益'] },
  xAxis: { type: 'category', data: ['2019/10/12', '2019/10/24', '2019/11/07'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: '沪深300',
      type: 'line',
      data: [2, 6, 10],
      smooth: true
    },
    {
      name: '我的收益',
      type: 'line',
      data: [1, 5, 8],
      smooth: true
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
.product-detail-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0;
}
.info-bar {
  margin-bottom: 12px;
}
.info-title {
  font-size: 18px;
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
}
.info-row {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 15px;
  color: #333;
}
.buy-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 24px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 18px;
  cursor: pointer;
}
.sell-btn {
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 24px;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  cursor: pointer;
}
.main-content {
  display: flex;
  gap: 32px;
  margin-bottom: 18px;
}
.left-content {
  flex: 2;
}
.right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.section-title {
  color: #197aff;
  font-size: 16px;
  font-weight: bold;
  margin: 18px 0 8px 0;
  text-decoration: underline;
  cursor: pointer;
}
.hold-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.hold-table th, .hold-table td {
  border: 1px solid #bbb;
  padding: 8px 12px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.hold-table th {
  background: #e5e5e5;
  font-weight: bold;
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
.order-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  margin-bottom: 12px;
}
.order-table th, .order-table td {
  border: 1px solid #bbb;
  padding: 8px 12px;
  text-align: center;
  font-size: 15px;
  color: #222;
}
.order-table th {
  background: #e5e5e5;
  font-weight: bold;
}
.cancel-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}
</style> 