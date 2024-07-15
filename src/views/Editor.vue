<script lang="ts" setup>
import CustomEditor from '@/editor/CustomEditor.vue'
import AppMenu from '@/components/AppMenu.vue'
import AIComponent from '@/components/AIComponent.vue'
import { provide, ref } from 'vue'
import AIFormatComponent from '@/components/AIFormatComponent.vue'
import AITrigger from '@/components/AITrigger.vue'
const ocrURL = ref('')
const selection = ref('')
const rail = ref(true)
const lRail = ref(true)
provide('selection', selection)
provide('ocrURL', ocrURL)
provide('rail', rail)
provide('lRail', lRail)
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { getMe } from '@/apis/users';

const userStore = useUserStore();

onMounted(async () => {
    const user = await getMe()
  // {
  //   "code": 200,
  //     "data": {
  //     "username": "123",
  //       "email": "eone2017@outlook.com",
  //         "access": 0,
  //           "avatar": "",
  //             "id": 2;
  //   },
  //   "msg": "success";
  // }
  userStore.setUser(user.data);
});
</script>

<template>
  <a-layout>


    <a-layout>
      <a-layout-content>
        <CustomEditor></CustomEditor>
      </a-layout-content>
      <AIComponent></AIComponent>
      <AIFormatComponent></AIFormatComponent>
      <AITrigger></AITrigger>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped></style>
