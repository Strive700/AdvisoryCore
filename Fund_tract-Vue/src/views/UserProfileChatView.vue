<template>
  <div class="user-profile-chat-view">
    <div class="welcome-banner">
      <img class="banner-bg" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" />
      <div class="banner-content">
        <h1>欢迎来到智能用户画像中心</h1>
        <p>AI助力，洞察你的投资行为与兴趣偏好</p>
      </div>
    </div>
    <div class="main-content">
      <div class="profile-panel">
        <div class="profile-header">
          <img class="profile-avatar" src="https://lf-coze-web-cdn.coze.cn/obj/eden-cn/lm-lgvj/ljhwZthlaukjlkulzlp/coze/coze-logo.png" alt="头像" />
          <div class="profile-nickname">{{ userInfo?.nickname || 'admin' }}</div>
        </div>
        <h2>用户画像</h2>
        <div v-if="profileLoading">正在生成用户画像...</div>
        <template v-else>
          <div v-if="profileObj">
            <div class="profile-section"><span class="profile-label">兴趣：</span>{{ profileObj.兴趣 }}</div>
            <div class="profile-section"><span class="profile-label">活跃度：</span>{{ profileObj.活跃度 }}</div>
            <div class="profile-section"><span class="profile-label">偏好：</span>{{ profileObj.偏好 }}</div>
            <div class="profile-section">
              <span class="profile-label">标签：</span>
              <span>
                <span v-for="(tag, idx) in profileObj.标签" :key="idx" class="profile-tag">{{ tag }}</span>
              </span>
            </div>
            <div v-if="profileObj.雷达" class="profile-section">
              <span class="profile-label">能力雷达：</span>
              <div ref="radarRef" style="width:420px;height:420px;margin-top:8px;"></div>
            </div>
          </div>
          <div v-else style="color:#f56c6c;white-space:pre-line;">{{ userProfile }}</div>
        </template>
        <button @click="fetchUserProfile" :disabled="profileLoading" style="margin-top:16px;">刷新画像</button>
        <div class="profile-interpret-card">
          <h3>画像解读</h3>
          <p>本画像基于你近期的投资行为、兴趣偏好和活跃度，由AI自动生成，仅供参考。建议结合自身实际情况理性投资。</p>
        </div>
      </div>
      <div class="chat-panel">
        <div class="chat-welcome">🤖 智能助手：有任何投资疑问，欢迎随时咨询！</div>
        <div id="coze-chat-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import * as echarts from 'echarts'
const userProfile = ref('')
const profileLoading = ref(true)
const profileObj = ref<any>(null)
const radarRef = ref<HTMLDivElement | null>(null)
const userInfo = ref<{ nickname: string, id: string, url?: string } | null>(null)
let chart: echarts.ECharts | null = null

async function fetchUserInfo() {
  try {
    const res = await fetch('/api/coze-config')
    const config = await res.json()
    userInfo.value = config.userInfo || { nickname: 'admin', id: 'user123' }
  } catch {
    userInfo.value = { nickname: 'admin', id: 'user123' }
  }
}

async function fetchUserProfile() {
  profileLoading.value = true
  const userId = localStorage.getItem('userId') || 'test_user'
  try {
    const res = await fetch('/track/ai/generate-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    })
    const text = await res.text()
    userProfile.value = text
    console.log('AI原始返回内容:', text)
    try {
      profileObj.value = JSON.parse(text)
      console.log('解析后的 profileObj:', profileObj.value)
      await nextTick()
      renderRadar()
    } catch {
      // 容错：用正则提取第一个 {...} 再尝试解析
      const match = text.match(/{[\s\S]*}/)
      if (match) {
        try {
          profileObj.value = JSON.parse(match[0])
          console.log('正则提取后解析的 profileObj:', profileObj.value)
          await nextTick()
          renderRadar()
        } catch {}
      } else {
        profileObj.value = null
      }
    }
  } catch (e) {
    userProfile.value = '用户画像生成失败，请稍后重试。'
    profileObj.value = null
  } finally {
    profileLoading.value = false
  }
}

function renderRadar() {
  if (!radarRef.value) {
    // DOM 还没挂载，延迟重试
    setTimeout(renderRadar, 50)
    return
  }
  if (profileObj.value && profileObj.value.雷达) {
    const radarData = profileObj.value.雷达
    console.log('用于雷达图的数据:', radarData)
    if (chart) {
      chart.dispose()
    }
    chart = echarts.init(radarRef.value)
    const indicators = Object.keys(radarData).map(key => ({
      name: key,
      max: 100
    }))
    const values = Object.values(radarData)
    chart.setOption({
      tooltip: {},
      radar: {
        indicator: indicators,
        radius: 100
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: values,
            name: '用户画像'
          }
        ]
      }]
    })
  }
}

onMounted(() => {
  fetchUserInfo()
  fetchUserProfile()
  // 动态加载Coze SDK
  if (!window.CozeWebSDK) {
    const script = document.createElement('script');
    script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.10/libs/cn/index.js';
    script.onload = () => {
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7522320827526856723',
        },
        componentProps: {
          title: 'Coze',
        },
        auth: {
          type: 'token',
          token: 'cztei_qA3KWHj55wkvsVTKng52OI5ff0W0xJRTQm7v1VtvYBlG7YraMujRcccXplP1Rl5Db',
          onRefreshToken: function () {
            return 'cztei_qA3KWHj55wkvsVTKng52OI5ff0W0xJRTQm7v1VtvYBlG7YraMujRcccXplP1Rl5Db'
          }
        }
      });
    };
    document.body.appendChild(script);
  } else {
    new window.CozeWebSDK.WebChatClient({
      config: {
        bot_id: '7522320827526856723',
      },
      componentProps: {
        title: 'Coze',
      },
      auth: {
        type: 'token',
        token: 'cztei_qA3KWHj55wkvsVTKng52OI5ff0W0xJRTQm7v1VtvYBlG7YraMujRcccXplP1Rl5Db',
        onRefreshToken: function () {
          return 'cztei_qA3KWHj55wkvsVTKng52OI5ff0W0xJRTQm7v1VtvYBlG7YraMujRcccXplP1Rl5Db'
        }
      }
    });
  }
})
// 声明window.CozeWebSDK类型
// @ts-ignore
declare global {
  interface Window {
    CozeWebSDK?: any;
  }
}
</script>

<style scoped>
.user-profile-chat-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f7fa;
}
.welcome-banner {
  position: relative;
  width: 100%;
  height: 180px;
  margin-bottom: 24px;
  overflow: hidden;
  border-radius: 0 0 18px 18px;
}
.banner-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}
.banner-content {
  position: absolute;
  left: 32px;
  top: 32px;
  color: #fff;
}
.banner-content h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}
.banner-content p {
  font-size: 18px;
  opacity: 0.95;
}
.main-content {
  display: flex;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
.profile-panel {
  flex: 1;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 24px 16px 32px 16px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}
.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 18px;
  border: 2px solid #e0f3ff;
  background: #f5f7fa;
}
.profile-nickname {
  font-size: 20px;
  font-weight: bold;
  color: #222;
}
.profile-section {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.profile-label {
  font-weight: bold;
  color: #409eff;
  width: 80px;
  flex-shrink: 0;
}
.profile-tag {
  background: #e0f3ff;
  color: #409eff;
  border-radius: 4px;
  padding: 2px 10px;
  margin-right: 8px;
  margin-bottom: 4px;
  font-size: 13px;
  display: inline-block;
}
.profile-interpret-card {
  background: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  padding: 16px 14px;
  margin-top: 24px;
  width: 100%;
}
.profile-interpret-card h3 {
  margin: 0 0 8px 0;
  font-size: 17px;
  color: #409eff;
}
.profile-interpret-card p {
  margin: 0;
  color: #666;
  font-size: 15px;
}
.chat-panel {
  flex: 2;
  min-width: 400px;
  display: flex;
  flex-direction: column;
}
.chat-welcome {
  background: #e0f3ff;
  color: #409eff;
  border-radius: 8px;
  padding: 12px 18px;
  margin-bottom: 18px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
}
#coze-chat-container {
  min-height: 500px;
}
</style> 