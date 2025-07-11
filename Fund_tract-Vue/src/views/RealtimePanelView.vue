<template>
  <div class="realtime-panel-view">
    <h1>实时数据面板</h1>
    <div class="charts-row">
      <div class="chart-box">
        <h3>活跃用户趋势</h3>
        <canvas ref="userChart"></canvas>
      </div>
      <div class="chart-box">
        <h3>事件数趋势</h3>
        <canvas ref="eventChart"></canvas>
      </div>
    </div>
    <div class="panel-row">
      <RealtimePanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RealtimePanel from '@/components/RealtimePanel.vue'
import Chart from 'chart.js/auto'

const userChart = ref<HTMLCanvasElement | null>(null)
const eventChart = ref<HTMLCanvasElement | null>(null)

async function fetchTrendData() {
  // 请求后端真实趋势数据
  const [userTrend, eventTrend] = await Promise.all([
    fetch('/track/event/active-users-trend?minutes=10').then(r => r.json()),
    fetch('/track/event/event-count-trend?minutes=10').then(r => r.json()),
  ])
  // 格式化数据
  const labels = userTrend.map((item: any) => item.time)
  const userData = userTrend.map((item: any) => item.value)
  const eventData = eventTrend.map((item: any) => item.value)
  return { labels, userData, eventData }
}

onMounted(async () => {
  const { labels, userData, eventData } = await fetchTrendData()
  if (userChart.value) {
    new Chart(userChart.value, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '活跃用户数',
          data: userData,
          borderColor: '#1890ff',
          backgroundColor: 'rgba(24,144,255,0.1)',
          fill: true,
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    })
  }
  if (eventChart.value) {
    new Chart(eventChart.value, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '事件数',
          data: eventData,
          borderColor: '#52c41a',
          backgroundColor: 'rgba(82,196,26,0.1)',
          fill: true,
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    })
  }
})
</script>

<style scoped>
.realtime-panel-view {
  max-width: 1100px;
  margin: 0 auto;
  padding: 32px 16px;
}
.charts-row {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
}
.chart-box {
  flex: 1;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px 16px 16px 16px;
  min-width: 320px;
}
.panel-row {
  margin-top: 24px;
}
</style> 