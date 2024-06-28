<script lang="ts" setup>
import { inject, type Ref, ref } from 'vue'
import { RobotOutlined } from '@ant-design/icons-vue'

const rail = inject<Ref>('rail')
const show = ref(true)
const handleClick = () => {
  if (rail) {
    rail.value = !rail.value
  }
}
</script>
<template>
  <a-float-button v-show="rail" tooltip="AI" type="primary" @click="handleClick">
    <template #icon>
      <RobotOutlined />
    </template>
  </a-float-button>
</template>
