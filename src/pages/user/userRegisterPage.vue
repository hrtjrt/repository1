<template>
    <div id="userRegisterPage">
        <h2 class="title">用户注册</h2>
        <a-form
        style="max-width: 480px;margin: 0 auto;"
    :model="formState"
    name="basic"
    label-align="left"
    :label-col="{ span: 7 }"
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




    <a-form-item
      label="确认密码"
      name="checkPassword"
      :rules="[{ required: true, message: '请再次输入密码!' },{min:8,message:'确认密码不能小于8位'}]"
    >
      <a-input-password 
        v-model:value="formState.checkPassword"
        placeholder="请再次输入密码" />
    </a-form-item>





    <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
      <a-button type="primary" html-type="submit">注册</a-button>
    </a-form-item>
  </a-form>
    </div>

</template>




<script  setup lang="ts">
import { userRegister } from '@/api/user';
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

interface FormState {
  userAccount: string;
  userPassword: string;
  checkPassword:string;
  remember: boolean;
}

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  remember: true,
});

const router = useRouter();
// 表单提交
const handleSubmit = async (values: any) => {
//判断两次密码是否一致
if (formState.userPassword != formState.checkPassword) {
    message.error('两次输入的密码不一致');
    return;
}
  try {
    const res = await userRegister(values);
    if (res.data?.code === 0 && res.data.data) {
      message.success("注册成功");
      router.push({
        path: "/user/login",
        replace: true,
      });
    } else {
      message.error('注册失败' + (res.data?.description ?? ''));
    }
  } catch (e) {
    message.error('注册失败：后端服务未启动或网络异常');
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>




<style scoped>
#userRegisterPage .title {
    text-align: center;
    margin-bottom: 16px;
}


</style>
