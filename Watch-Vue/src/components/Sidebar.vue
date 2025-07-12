<template>
  <div class="sidebar">
    <div class="logo">
      <i class="iconfont icon-gupiao"></i>
      <span>基金投顾检测平台</span>
    </div>
    <div class="realtime-menu-panel">
      <router-link to="/realtime-panel" class="menu-item">
        <i class="iconfont icon-chart-screen"></i>
        <span>实时数据面板</span>
      </router-link>
      <router-link to="/user-profile-chat" class="menu-item">
        <i class="iconfont icon-user"></i>
        <span>用户画像与AI助手</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import RealtimePanel from './RealtimePanel.vue'
import request from '@/utils/request'

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const showRealtimePanel = ref(false)

function toggleRealtimePanel() {
  showRealtimePanel.value = !showRealtimePanel.value
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #001529;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
}
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #002140;
  font-size: 18px;
  font-weight: bold;
}
.logo i {
  margin-right: 8px;
  color: #1890ff;
  font-size: 20px;
}
.menu {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}
.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #e6e6e6;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}
.menu-item i:first-child {
  font-size: 16px;
  margin-right: 10px;
  width: 16px;
  text-align: center;
}
.menu-item span {
  flex: 1;
}
.menu-item:hover, .menu-item.active {
  color: #fff;
  background-color: #1890ff;
}
.realtime-menu-panel {
  padding: 12px 0 0 0;
  border-top: 1px solid #22334d;
  background: #001529;
}
.realtime-panel-sidebar {
  background: #fff;
  color: #222;
  border-radius: 8px;
  margin: 12px 8px 8px 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 12px 8px;
  max-width: 204px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style> 