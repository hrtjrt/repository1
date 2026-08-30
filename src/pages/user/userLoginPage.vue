<template>
    <div id="userLoginPage">
        <h2 class="title">用户登录</h2>
        <a-form
        style="max-width: 480px;margin: 0 auto;"
    :model="formState"
    name="basic"
    label-align="left"
    :label-col="{ span: 3 }"
    :wrapper-col="{ span: 20 }"
    autocomplete="off"
    @finish="handleSubmit"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="账号"
      name="userAccount"
      :rules="[{ required: true, message: '请输入账号!' }]"
    >
      <a-input 
        v-model:value="formState.userAccount" 
        placeholder="请输入账号"/>
    </a-form-item>

    <a-form-item
      label="密码"
      name="userPassword"
      :rules="[{ required: true, message: '请输入密码!' },{min:8,message:'密码不能小于8位'}]"
    >
      <a-input-password 
        v-model:value="formState.userPassword"
        placeholder="请输入密码" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
    </div>

</template>




<script  setup lang="ts">
import { userLogin } from '@/api/user';
import { userLoginUserStore } from '@/store/useLoginUserStore';
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

interface FormState {
  userAccount: string;
  userPassword: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  remember: true,
});

const router = useRouter();
const loginUserStore = userLoginUserStore();
// 表单提交
const handleSubmit = async (values: any) => {
  const res = await userLogin(values)
  if (res.data.code === 0 && res.data.data) {
    await loginUserStore.fetchLoginUser();
    message.success("登陆成功");
    router.push({
      path:"/",
      replace:true,
    })
  } else{
    message.error('登录失败');
  }
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>




<style scoped>
#userLoginPage .title {
    text-align: center;
    margin-bottom: 16px;
}


</style>
