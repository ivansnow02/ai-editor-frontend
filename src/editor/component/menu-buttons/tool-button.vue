<template>
  <template v-for="tool in desserts" :key="tool.name">
    <a-tooltip placement="top">
      <template #title>
        <span>{{ tool.tip }}</span>
      </template>
      <div 
        :class="['tools__button', editor.isActive(tool.name) ? 'tool--active' : '']"
        @click="tool.click"
      >
        <component :is="tool.component" style="font-size: 16px; font-weight: 600" />
      </div>
    </a-tooltip>
  </template>
</template>

<script setup>
const props = defineProps(['desserts', 'editor'])
</script>
.tools_button{ 
  box-shadow:0 10px 10px #D9AFD9;
  display: inline-block;
  color: rgb(56, 97, 230);
  background-color: #D9AFD9;
  background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
}
<style lang="scss" scoped></style>
