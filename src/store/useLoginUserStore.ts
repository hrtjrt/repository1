import { getCurrentUser } from '@/api/user';
import {defineStore} from 'pinia';
import { ref } from 'vue';


export const userLoginUserStore = defineStore('loginUser', () => {
  const loginUser = ref<any>({
    username:'未登录'

  })

  //远程获取登录用户信息
  async function fetchLoginUser() {
    try {
      const res = await getCurrentUser();
      if (res.data?.code === 0 && res.data.data) {
        loginUser.value = res.data.data;
      }
    } catch (e) {
      // 后端未启动 / 网络异常时静默失败，保持默认“未登录”状态
      console.warn("获取登录用户失败（可能未启动后端）", e);
    }
  }

  //单独设置信息
  function setLoginUser(newLoginUser:any){
    loginUser.value = newLoginUser;
  }
  
 
  return { loginUser, fetchLoginUser, setLoginUser}
})