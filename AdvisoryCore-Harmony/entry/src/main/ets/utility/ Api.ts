import { axiosAPI } from '../utility/BaseRequest'

export const getList = (id:string) =>{
  return axiosAPI.get<object>({url:'自己的请求地址',
    params:{
      "id":id
    }})
}
