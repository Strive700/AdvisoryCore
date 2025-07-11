<template>
  <div class="realtime-panel">
    <h2>实时数据面板</h2>
    <div class="stats">
      <div>当前在线用户（5分钟内活跃）：<b>{{ activeUsers }}</b></div>
      <div>最近5分钟事件总数：<b>{{ eventCount }}</b></div>
    </div>
    <div class="lists">
      <div>
        <h3>活跃页面排行</h3>
        <ol>
          <li v-for="page in activePages" :key="page">{{ page }}</li>
        </ol>
      </div>
      <div>
        <h3>活跃模块排行</h3>
        <ol>
          <li v-for="module in activeModules" :key="module">{{ module }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeUsers = ref(0)
const eventCount = ref(0)
const activePages = ref<string[]>([])
const activeModules = ref<string[]>([])
let timer: number | undefined

const fetchStats = async () => {
  try {
    const [users, count, pages, modules] = await Promise.all([
      fetch('/track/event/active-users').then(r => r.json()),
      fetch('/track/event/count').then(r => r.json()),
      fetch('/track/event/active-pages').then(r => r.json()),
      fetch('/track/event/active-modules').then(r => r.json()),
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
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  max-width: 480px;
}
.stats {
  display: flex;
  gap: 32px;
  margin-bottom: 16px;
}
.lists {
  display: flex;
  gap: 32px;
}
h2 {
  margin-bottom: 16px;
}
h3 {
  margin-bottom: 8px;
}
ol {
  padding-left: 20px;
}
</style> 