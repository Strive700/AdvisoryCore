<template>
  <div class="sidebar">
    <div class="logo">
      <i class="iconfont icon-gupiao"></i>
      <span>基金投顾前台</span>
    </div>
    <nav class="menu">
      <router-link to="/home" class="menu-item" active-class="active" exact
        data-track-id="sidebar-home-menu"
        @click="() => handleMenuClick('home')"
      >
        <i class="iconfont icon-zhuyemian"></i>
        <span>主页面</span>
      </router-link>
      <router-link to="/market" class="menu-item" active-class="active"
        data-track-id="sidebar-market-menu"
        @click="() => handleMenuClick('market')"
      >
        <i class="iconfont icon-chart-screen"></i>
        <span>基金行情</span>
      </router-link>
      <router-link to="/position" class="menu-item" active-class="active"
        data-track-id="sidebar-position-menu"
        @click="() => handleMenuClick('position')"
      >
        <i class="iconfont icon-chicang"></i>
        <span>持仓</span>
      </router-link>
      <router-link to="/securities" class="menu-item" active-class="active"
        data-track-id="sidebar-securities-menu"
        @click="() => handleMenuClick('securities')"
      >
        <i class="iconfont icon-zhengquanxinxi"></i>
        <span>基金信息</span>
      </router-link>
      <router-link to="/orders" class="menu-item" active-class="active"
        data-track-id="sidebar-orders-menu"
        @click="() => handleMenuClick('orders')"
      >
        <i class="iconfont icon-dingdanguanli"></i>
        <span>订单管理</span>
      </router-link>
      <router-link to="/index-chart" class="menu-item" active-class="active" 
        data-track-id="sidebar-index-market"
        @click="() => handleMenuClick('index')"
      >
        <i class="iconfont icon-chart-screen"></i>
        <span>指数行情</span>
      </router-link>
    </nav>
    <div class="realtime-menu-panel">
      <router-link to="/realtime-panel" class="menu-item" data-track-id="sidebar-realtime-panel">
        <i class="iconfont icon-chart-screen"></i>
        <span>实时数据面板</span>
      </router-link>
      <router-link to="/user-profile-chat" class="menu-item" data-track-id="sidebar-user-profile-chat">
        <i class="iconfont icon-user"></i>
        <span>用户画像与AI助手</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { trackEvent } from '../utils/track';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import RealtimePanel from './RealtimePanel.vue'

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const showRealtimePanel = ref(false)

function handleMenuClick(menu: 'home' | 'market' | 'position' | 'securities' | 'orders' | 'index') {
  const menuMap: Record<'home' | 'market' | 'position' | 'securities' | 'orders' | 'index', {
    event_id: string;
    event_name: string;
    target_component: string;
    selector: string;
    extra_params: { menuName: string; menuCode: string };
  }> = {
    home: {
      event_id: 'click_home_menu',
      event_name: '点击主页面菜单',
      target_component: '主页面菜单项',
      selector: "[data-track-id='sidebar-home-menu']",
      extra_params: { menuName: '主页面', menuCode: 'home' }
    },
    market: {
      event_id: 'click_market_menu',
      event_name: '点击基金行情菜单',
      target_component: '基金行情菜单项',
      selector: "[data-track-id='sidebar-market-menu']",
      extra_params: { menuName: '基金行情', menuCode: 'market' }
    },
    position: {
      event_id: 'click_position_menu',
      event_name: '点击持仓菜单',
      target_component: '持仓菜单项',
      selector: "[data-track-id='sidebar-position-menu']",
      extra_params: { menuName: '持仓', menuCode: 'position' }
    },
    securities: {
      event_id: 'click_securities_menu',
      event_name: '点击基金信息菜单',
      target_component: '基金信息菜单项',
      selector: "[data-track-id='sidebar-securities-menu']",
      extra_params: { menuName: '基金信息', menuCode: 'securities' }
    },
    orders: {
      event_id: 'click_orders_menu',
      event_name: '点击订单管理菜单',
      target_component: '订单管理菜单项',
      selector: "[data-track-id='sidebar-orders-menu']",
      extra_params: { menuName: '订单管理', menuCode: 'orders' }
    },
    index: {
      event_id: 'click_index_market',
      event_name: '点击指数行情菜单',
      target_component: '指数行情菜单项',
      selector: "[data-track-id='sidebar-index-market']",
      extra_params: { menuName: '指数行情', menuCode: 'index' }
    }
  };
  const info = menuMap[menu];
  trackEvent({
    ...info,
    module: 'sidebar_menu',
    page_name: '所有页面',
    trigger_type: 'click',
    priority: '中',
    user_id: user.value?.userId || '',
    user_name: user.value?.nickName || '',
    user_email: user.value?.email || '',
    user_phone: user.value?.phone || '',
    user_address: '',
    user_city: '',
    user_state: ''
  });
}

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