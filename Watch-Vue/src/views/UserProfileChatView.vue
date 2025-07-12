<template>
  <div class="user-profile-chat-view single-panel">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import request from '@/utils/request'
const userProfile = ref('')
const profileLoading = ref(true)
const profileObj = ref<any>(null)
const radarRef = ref<HTMLDivElement | null>(null)
const userInfo = ref<{ nickname: string, id: string, url?: string } | null>(null)
let chart: echarts.ECharts | null = null

async function fetchUserInfo() {
  try {
    const res = await request.get('/api/coze-config')
    const config = res.data
    userInfo.value = config.userInfo || { nickname: 'admin', id: 'user123' }
  } catch {
    userInfo.value = { nickname: 'admin', id: 'user123' }
  }
}

async function fetchUserProfile() {
  profileLoading.value = true
  const userId = localStorage.getItem('userId') || "test_user"
  try {
    const res = await request.post('/track/ai/generate-profile', { user_id: userId }, { responseType: 'text',timeout: 300000 })
    const text = res.data
    userProfile.value = text
    console.log('AI原始返回内容:', text)
    try {
      profileObj.value = JSON.parse(text)
      console.log('解析后的 profileObj:', profileObj.value)
      await nextTick()
      renderRadar()
    } catch {
      // 优先匹配 ```json ... ``` 代码块里的 JSON
      const match = text.match(/```json\s*({[\s\S]*?})\s*```|({[\s\S]*})/)
      if (match) {
        let jsonStr = match[1] || match[2]
        try {
          profileObj.value = JSON.parse(jsonStr)
          console.log('正则提取后解析的 profileObj:', profileObj.value)
          await nextTick()
          renderRadar()
        } catch {}
      } else {
        profileObj.value = null
      }
    }
  } catch (e: any) {
    userProfile.value = '用户画像生成失败，请稍后重试。'
    profileObj.value = null
    // 打印后端返回内容和错误信息
    if (e && e.response && e.response.data) {
      console.error('用户画像生成失败，后端返回内容:', e.response.data, '错误信息:', e)
    } else {
      console.error('用户画像生成失败，错误信息:', e)
    }
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
          token: 'cztei_q012rOh6ycGbiIkUA0ZLy5Z4DARvwy2dPn9sVrkPIjbXoDtAnPlTeoyOnAwkoOuQ4',
          onRefreshToken: function () {
            return 'cztei_q012rOh6ycGbiIkUA0ZLy5Z4DARvwy2dPn9sVrkPIjbXoDtAnPlTeoyOnAwkoOuQ4'
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
        token: 'cztei_q012rOh6ycGbiIkUA0ZLy5Z4DARvwy2dPn9sVrkPIjbXoDtAnPlTeoyOnAwkoOuQ4',
        onRefreshToken: function () {
          return 'cztei_q012rOh6ycGbiIkUA0ZLy5Z4DARvwy2dPn9sVrkPIjbXoDtAnPlTeoyOnAwkoOuQ4'
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
.user-profile-chat-view.single-panel {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e3f0ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-panel {
  flex: none;
  color: #222;
}
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}
.profile-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-right: 22px;
  border: 3px solid transparent;
  background: linear-gradient(135deg,#e0f3ff 60%,#b2e0ff 100%);
  box-shadow: 0 2px 12px rgba(64,158,255,0.10);
  transition: box-shadow 0.2s;
}
.profile-avatar:hover {
  box-shadow: 0 4px 24px rgba(64,158,255,0.18);
}
.profile-nickname {
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(90deg,#409eff 30%,#67c23a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.profile-panel h2 {
  font-size: 1.25rem;
  color: #409eff;
  margin-bottom: 18px;
  font-weight: 700;
}
.profile-section {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px dashed #e3e8ee;
  padding-bottom: 7px;
}
.profile-section:last-of-type {
  border-bottom: none;
}
.profile-label {
  font-weight: bold;
  color: #409eff;
  width: 80px;
  flex-shrink: 0;
}
.profile-tag {
  background: linear-gradient(90deg,#e0f3ff 60%,#f0faff 100%);
  color: #409eff;
  border-radius: 16px;
  padding: 4px 14px;
  margin-right: 8px;
  margin-bottom: 4px;
  font-size: 14px;
  display: inline-block;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
}
.profile-interpret-card {
  background: linear-gradient(135deg,#f8fafc 60%,#e3f0ff 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(64,158,255,0.04);
  padding: 18px 16px;
  margin-top: 28px;
  width: 100%;
}
.profile-interpret-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #409eff;
  font-weight: 700;
}
.profile-interpret-card p {
  margin: 0;
  color: #666;
  font-size: 15px;
}
button {
  margin-top: 16px;
  background: linear-gradient(90deg,#409eff 30%,#67c23a 100%);
  color: #fff;
  border: none;
  border-radius: 22px;
  padding: 10px 32px;
  font-size: 1.08rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(64,158,255,0.08);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
}
button:active {
  transform: scale(0.97);
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.profile-section[ref="radarRef"], .profile-section .echarts {
  background: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(64,158,255,0.04);
  padding: 12px;
  margin-top: 8px;
}
</style> 