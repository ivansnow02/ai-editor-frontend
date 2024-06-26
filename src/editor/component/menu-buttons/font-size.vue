<template>
  <div>
    <a-tooltip placement="top">
      <template #title>
        <span>标题</span>
      </template>
      <div class="header_button">
        <a-select v-model:value="value" :options="fontSizeOptions" @change="handleChange" />
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { defineModel, inject, type Ref } from 'vue'
import { fontSizeOptions } from '@/utils/constant'

const value = defineModel()

const props = defineProps(['editor'])

const handleChange = (value: string) => {
  const fontSize = `${value}px`
  props.editor.chain().focus().setFontSize(fontSize).run()
}
</script>

<style lang="scss" scoped>
.header_button {
  border: 1px solid transparent;
  box-sizing: border-box;
  align-items: center;
  border-radius: 50%;
  color: #303133;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 2px;
  outline: 0;
  width: 75px;
  box-sizing: border-box;

  &--title {
    font-size: 17px;
  }
}

::v-deep .ant-select-selector {
  width: 100%;
  border: 1px solid #eee !important;
  border-radius: 5px !important;
}
</style>
