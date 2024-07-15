<template>
    <div>
        <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" :rules="rules">
            <a-form-item has-feedback label="账号" name="username">
                <a-input v-model:value="formState.username">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item has-feedback label="邮箱" name="email">
                <a-input v-model:value="formState.email">
                    <template #prefix>
                        <MailOutlined class="site-form-item-icon" />
                    </template>
                </a-input>

            </a-form-item>

            <a-form-item label="密码" name="password">
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

            <a-form-item label="邮箱验证码" name="emailCode">
                <a-input v-model:value="formState.emailCode" />
            </a-form-item>

            <a-form-item>
                <a-button :disabled="disabled" @click="sendEmailCode">
                    发送验证码
                </a-button>
                <a-button :disabled="disabled2" type="primary" html-type="submit">
                    注册
                </a-button>
                <a-button type="link" @click="() => { toggle = 1; }">
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
import { register, sendCode, checkUser, checkMail } from "@/apis/auth";
import type { Rule } from "ant-design-vue/es/form";

const toggle = inject<Ref>("toggle");
interface FormState {
	email: string;
	password: string;
	password2: string;
	username: string;
	emailCode: string;
}
const formState = reactive<FormState>({
	email: "",
	password: "",
	password2: "",
	username: "",
	emailCode: "",
});

const checkUsername = async (_rule: Rule, value: string) => {
	if (!value) {
		return Promise.reject("请输入用户名");
	}
	try {
		const res = await checkUser(value); // 假设这个函数返回一个布尔值，表示用户名是否存在
		if (res.data) {
			// 如果用户名已存在，验证失败
			return Promise.reject("用户名已存在");
		}
		// 如果用户名不存在，验证成功
		return Promise.resolve();
	} catch (error) {
		// 如果请求过程中发生错误，也视为验证失败
		return Promise.reject("验证过程中出现错误");
	}
};

const checkPass = async (_rule: Rule, value: string) => {
	if (!value) {
		return Promise.reject("请输入密码");
	}
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
    try {
        const res = await checkMail(value); 
        if (res.data) {
            // 如果邮箱已存在，验证失败
            return Promise.reject("邮箱已存在");
        }
        // 如果邮箱不存在，验证成功
        return Promise.resolve();
    } catch (error) {
        // 如果请求过程中发生错误，也视为验证失败
        return Promise.reject("验证过程中出现错误");
    }
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
	username: [
		{ required: true, message: "请输入您的用户名！" },
		{ validator: checkUsername, trigger: "blur" },
	],
	email: [
		{ required: true, message: "请输入您的邮箱！" },
		{ validator: checkEmail, trigger: "blur" },
	],
	password: [
		{ required: true, message: "请输入您的密码！" },
		{ validator: checkPass, trigger: "blur" },
	],
	password2: [
		{ required: true, message: "请再次输入您的密码！" },
		{ validator: checkPass2, trigger: "blur" },
	],
	emailCode: [
		{ required: true, message: "请输入您的邮箱验证码！" },
		{ validator: checkEmailCode, trigger: "blur" },
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
    register(
        formState.username,
        formState.email,
        formState.password,
        formState.emailCode,
    )
        .then(() => {
            message.success("注册成功，请返回登录");
            toggle.value = 1;
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                // 这里处理400错误
                message.error("请求参数错误，请检查输入");
            } else {
                // 其他错误
                message.error("注册失败，请检查邮箱和验证码");
            }
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
