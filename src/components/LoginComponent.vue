<template>
    <div>
        <a-form v-if="toggle===1" :model="formState" name="normal_login" class="login-form" @finish="onFinish"
            @finishFailed="onFinishFailed">
            <a-form-item label="账号" name="username" :rules="[{ required: true, message: '请输入您的用户名！' }]">
                <a-input v-model:value="formState.username">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入您的密码！' }]">
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-button type="link" class="login-form-forgot" @click="()=> {toggle = 2}">忘记密码</a-button>
            </a-form-item>

            <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                    登录
                </a-button>
                或
                <a-button type="link" @click="() => { toggle = 3; }">现在注册</a-button>
            </a-form-item>
        </a-form>
        <ForgetPass v-if="toggle===2" />
        <RegisterComponent v-if="toggle===3" />



    </div>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { reactive, computed, ref, provide } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { authFunc } from '@/apis/auth';
import { setToken } from '@/utils/token';
import { router } from '@/router';
import RegisterComponent from '@/components/RegisterComponent.vue';
import ForgetPass from '@/components/ForgetPass.vue';
const toggle = ref(1);
provide('toggle', toggle);
interface FormState {
    username: string;
    password: string;
}
const formState = reactive<FormState>({
    username: '',
    password: '',
});
const onFinish = () => {
    authFunc(formState.username, formState.password, 'token').then((res) => {
        setToken(res.access_token);
        message.success('登录成功');
        
        // isActive.value = false
        router.push('/');
    }).catch(() => {
        message.error('登录失败，请检查用户名和密码');
    });
};



const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.username && formState.password);
});
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#components-form-demo-normal-login .login-form-forgot {
    float: right;
}

#components-form-demo-normal-login .login-form-button {
    width: 100%;
}
</style>
