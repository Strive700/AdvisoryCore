<template>
  <div class="realtime-panel">
    <div class="panel-header">
      <i class="iconfont icon-chart-screen"></i>
      <span>实时数据面板</span>
    </div>
    <div class="stats">
      <div class="stat-item">
        <div class="stat-label">当前在线用户</div>
        <div class="stat-value">{{ activeUsers }}</div>
        <div class="stat-desc">5分钟内活跃</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">事件总数</div>
        <div class="stat-value">{{ eventCount }}</div>
        <div class="stat-desc">最近5分钟</div>
      </div>
    </div>
    <div class="lists">
      <div class="list-box">
        <h3>活跃页面排行</h3>
        <ol>
          <li v-for="(page, idx) in activePages" :key="page">
            <span class="rank">{{ idx + 1 }}</span>
            <span class="item-text">{{ page }}</span>
          </li>
        </ol>
      </div>
      <div class="list-box">
        <h3>活跃模块排行</h3>
        <ol>
          <li v-for="(module, idx) in activeModules" :key="module">
            <span class="rank">{{ idx + 1 }}</span>
            <span class="item-text">{{ module }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import request from '@/utils/request'

const activeUsers = ref(0)
const eventCount = ref(0)
const activePages = ref<string[]>([])
const activeModules = ref<string[]>([])
let timer: number | undefined

const fetchStats = async () => {
  try {
    const [users, count, pages, modules] = await Promise.all([
      request.get('/track/event/active-users').then(r => r.data),
      request.get('/track/event/count').then(r => r.data),
      request.get('/track/event/active-pages').then(r => r.data),
      request.get('/track/event/active-modules').then(r => r.data),
    ])
    activeUsers.value = users
    eventCount.value = count
    activePages.value = pages
    activeModules.value = modules
  } catch (e) {
    // 可加错误处理
  }
}

onMounted(() => {
  fetchStats()
  timer = window.setInterval(fetchStats, 5000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.realtime-panel {
  background: #fff;
  border-radius: 14px;
  padding: 28px 24px 20px 24px;
  box-shadow: 0 4px 24px rgba(24, 144, 255, 0.08), 0 1.5px 6px rgba(0,0,0,0.04);
  max-width: 520px;
  color: #222;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.panel-header {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 8px;
  gap: 10px;
  letter-spacing: 1px;
}
.panel-header .iconfont {
  font-size: 1.5rem;
}
.stats {
  display: flex;
  gap: 32px;
  justify-content: space-between;
  margin-bottom: 8px;
}
.stat-item {
  background: linear-gradient(135deg, #e3f2fd 0%, #f5faff 100%);
  border-radius: 10px;
  padding: 18px 22px 12px 22px;
  box-shadow: 0 2px 8px rgba(24,144,255,0.04);
  min-width: 120px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.stat-label {
  font-size: 1rem;
  color: #666;
  margin-bottom: 6px;
}
.stat-value {
  font-size: 2.1rem;
  font-weight: bold;
  color: #1890ff;
  margin-bottom: 2px;
  letter-spacing: 1px;
}
.stat-desc {
  font-size: 0.9rem;
  color: #aaa;
}
.lists {
  display: flex;
  gap: 32px;
  justify-content: space-between;
}
.list-box {
  flex: 1;
  background: #f8fafc;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(24,144,255,0.03);
  padding: 18px 16px 12px 16px;
  min-width: 120px;
}
.list-box h3 {
  font-size: 1.08rem;
  color: #1890ff;
  margin-bottom: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
}
ol {
  padding-left: 0;
  margin: 0;
}
ol li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 0;
  font-size: 1rem;
  color: #333;
  border-bottom: 1px dashed #e3e8ee;
  transition: background 0.2s;
}
ol li:last-child {
  border-bottom: none;
}
.rank {
  display: inline-block;
  width: 22px;
  height: 22px;
  background: #e6f7ff;
  color: #1890ff;
  border-radius: 50%;
  text-align: center;
  line-height: 22px;
  font-weight: 600;
  font-size: 1rem;
}
.item-text {
  flex: 1;
  word-break: break-all;
}
@media (max-width: 700px) {
  .realtime-panel {
    padding: 16px 4vw;
    max-width: 98vw;
    gap: 18px;
  }
  .stats, .lists {
    flex-direction: column;
    gap: 18px;
  }
  .stat-item, .list-box {
    min-width: 0;
    width: 100%;
  }
}
</style> 