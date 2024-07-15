<template>
    <a-dropdown :trigger="['hover','click']">
        <!-- 修复了 a-button 标签的闭合 -->
        <a-button type="link" shape="circle">
            <a-avatar size="small" :style="{ backgroundColor: backgroundColor }">{{ username[0] }}</a-avatar>
        </a-button>
        <template #overlay>
            <a-menu>
                <a-menu-item key="1" @click="logout">注销</a-menu-item>
            </a-menu>
        </template>
    </a-dropdown>
</template>
<script setup lang="ts">

import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue';
import { removeToken } from '@/utils/token';
import {router} from '@/router/index';

const userStore = useUserStore();

const username = ref('')

const backgroundColor = computed(() => {
  const firstChar = username.value.charAt(0).toUpperCase();
  if (firstChar >= 'A' && firstChar <= 'M') {
    return 'blue';
  }if (firstChar >= 'N' && firstChar <= 'Z') {
    return 'green';
  }
    return 'orange';
});

watch(() => userStore.user, (user) => {
    if (!user) return
    username.value = user.username
},
{ immediate: true })

const logout = () => {
    removeToken();
    userStore.clearUser();
    router.push('/login');
}
</script>