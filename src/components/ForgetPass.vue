<template>
    <div>
        <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" :rules="rules">
            <a-form-item has-feedback label="邮箱" name="email">
                <a-input v-model:value="formState.email">
                    <template #prefix>
                        <MailOutlined class="site-form-item-icon" />
                    </template>
                </a-input>

            </a-form-item>

            <a-form-item label="密码" name="password" >
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item has-feedback label="确认密码" name="password2">
                <a-input-password v-model:value="formState.password2">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item label="邮箱验证码" name="emailCode" >
                <a-input v-model:value="formState.emailCode" />
            </a-form-item>

            <a-form-item>
                <a-button :disabled="disabled" @click="sendEmailCode">
                    发送验证码
                </a-button>
                <a-button :disabled="disabled2" type="primary" html-type="submit">
                    确认修改
                </a-button>
                <a-button type="link" @click="()=>{toggle = 1}">
                    返回登录
                </a-button>

            </a-form-item>
        </a-form>



    </div>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { reactive, computed, ref, inject, type Ref } from "vue";
import { MailOutlined, LockOutlined } from "@ant-design/icons-vue";
import { resetPassword, sendCode } from "@/apis/auth";
import type { Rule } from "ant-design-vue/es/form";

const toggle = inject<Ref>("toggle");
interface FormState {
	email: string;
	password: string;
	password2: string;
	emailCode: string;
}
const formState = reactive<FormState>({
	email: "",
	password: "",
	password2: "",
	emailCode: "",
});

const checkPass = async (_rule: Rule, value: string) => {
	// 正则表达式验证密码
	const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
	if (!reg.test(value)) {
		return Promise.reject("密码必须包含数字和字母，长度在6-20之间");
	}
	return Promise.resolve();
};

const checkPass2 = async (_rule: Rule, value: string) => {
	if (value !== formState.password) {
		return Promise.reject("两次密码不一致");
	}
	return Promise.resolve();
};

const checkEmail = async (_rule: Rule, value: string) => {
	// 正则表达式验证邮箱
	const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if (!reg.test(value)) {
		return Promise.reject("请输入正确的邮箱");
	}
	return Promise.resolve();
};

const checkEmailCode = async (_rule: Rule, value: string) => {
	// 正则表达式验证邮箱
	const reg = /^\d{6}$/;
	if (!reg.test(value)) {
		return Promise.reject("请输入正确的验证码");
	}
	return Promise.resolve();
};

const rules: Record<string, Rule[]> = {
	email: [
		{ required: true, message: "请输入您的邮箱！" },
		{ validator: checkEmail },
        { trigger: "change" },
	],
	password: [
		{ required: true, message: "请输入您的密码！" },
		{ validator: checkPass },
		{ trigger: "change" },
	],
	password2: [
		{ required: true, message: "请再次输入您的密码！" },
		{ validator: checkPass2 },
        { trigger: "change" },
	],
	emailCode: [
		{ required: true, message: "请输入您的邮箱验证码！" },
		{ validator: checkEmailCode },
        { trigger: "change" },
	],
};

const sendEmailCode = async () => {
	try {
		await sendCode(formState.email);
		message.success("验证码发送成功");
	} catch (error) {
		message.error("验证码发送失败");
	}
};

const disabled = computed(() => {
	return !formState.email;
});
const disabled2 = computed(() => {
	return !formState.emailCode;
});

const onFinish = (values: any) => {
	if (formState.password !== formState.password2) {
		message.error("两次密码不一致");
		return;
	}
	resetPassword(formState.email, formState.password, formState.emailCode)
		.then((_res) => {
			message.success("修改成功");
			toggle.value = 1;
		})
		.catch(() => {
			message.error("修改失败");
		});
};
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
    max-width: 300px;
}

#normal-login-mail {
    margin-bottom: 16px;
}
</style>_values_res
