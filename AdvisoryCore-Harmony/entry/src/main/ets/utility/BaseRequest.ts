import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from '@ohos/axios';
import { promptAction } from '@kit.ArkUI';

// 创建Axios实例
export const instance = axios.create({
  baseURL: 'http://192.168.52.1:8080/api',
});


// 请求拦截器  发请求之前进入这里
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 这里可以对请求参数进行修改  比如请求头自动注入token
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error);
});


// 移除响应拦截器
// instance.interceptors.response.use((response: AxiosResponse) => {
//   // 直接返回后端响应体
//   return response.data;
// }, (error: AxiosError) => {
//   const res = error.response?.data as any;
//   if (res) {
//     promptAction.showToast({ message: String(res.msg || res.message || '未知错误') });
//   }
//   return Promise.reject(error);
// });


export default class RequestAxios {
  // get请求
  static get<T>(url: string, params?: object): Promise<AxiosResponse<T>> {
    return instance.get<T>(url, { params });
  }
  // post请求
  static post<T>(url: string, data?: object): Promise<AxiosResponse<T>> {
    return instance.post<T>(url, data);
  }
  // delete请求
  static delete<T>(url: string, data?: object): Promise<AxiosResponse<T>> {
    return instance.delete<T>(url, { data });
  }
  // put请求
  static put<T>(url: string, data?: object): Promise<AxiosResponse<T>> {
    return instance.put<T>(url, data);
  }
}