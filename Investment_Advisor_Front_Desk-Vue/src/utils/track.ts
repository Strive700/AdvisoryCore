// 统一埋点工具类
import request from './request';

export interface TrackEventParams {
  event_id: string;
  event_name: string;
  module: string;
  page_name?: string;
  trigger_type: string;
  target_component: string;
  selector?: string;
  extra_params?: Record<string, any>;
  priority?: string;
  user_id?: string;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_address?: string;
  user_city?: string;
  user_state?: string;
}

export function trackEvent(event: TrackEventParams) {
  // 使用 axios 实例发送埋点数据到后端
  request.post('/track/event', event)
    .then(res => {

    })
    .catch(err => {
      console.error('[TrackEvent] 后端上报失败', err);
    });
  // 本地调试输出
  console.log('[TrackEvent] 上报数据:', event);
} 